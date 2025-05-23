const db = require("../db");
pointPerCash = 100000; // Example: 1 point per 1,000 VND
// Get all orders with optional filtering
const getAllOrders = async (req, res) => {
  try {
    let query = db("Order")
      .leftJoin("Customer", "Order.idCustomer", "=", "Customer.idCustomer")
      .leftJoin("Employee", "Order.idEmployee", "=", "Employee.idNhanVien")
      .leftJoin("Promotion", "Order.idPromotion", "=", "Promotion.idPromotion")
      .select(
        "Order.*",
        "Customer.hoTen as tenKhachHang",
        "Customer.SDT",
        "Employee.tenNhanVien",
        "Promotion.tenKhuyenMai"
      );

    // Apply filters if provided
    if (req.query.status) {
      query = query.where("Order.trangThai", req.query.status);
    }

    if (req.query.customerId) {
      query = query.where("Order.idCustomer", req.query.customerId);
    }

    if (req.query.fromDate && req.query.toDate) {
      query = query.whereBetween("Order.ngayDatHang", [
        req.query.fromDate,
        req.query.toDate,
      ]);
    }

    const orders = await query.orderBy("Order.ngayDatHang", "desc");

    // Format numeric values
    const formattedOrders = orders.map((order) => ({
      ...order,
      tongTien: Number(order.tongTien),
    }));

    res.json(formattedOrders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get order by ID with details
const getOrderById = async (req, res) => {
  try {
    // Get order info
    const order = await db("Order")
      .join("Customer", "Order.idCustomer", "=", "Customer.idCustomer")
      .leftJoin("Employee", "Order.idEmployee", "=", "Employee.idNhanVien")
      .leftJoin("Promotion", "Order.idPromotion", "=", "Promotion.idPromotion")
      .where({ "Order.idOrder": req.params.id })
      .select(
        "Order.*",
        "Customer.hoTen as tenKhachHang",
        "Customer.SDT",
        "Employee.tenNhanVien",
        "Promotion.tenKhuyenMai",
        "Promotion.giaTriGiam"
      )
      .first();

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Get order details
    const orderDetails = await db("OrderDetail")
      .join("Laptop", "OrderDetail.idLaptop", "=", "Laptop.idLaptop")
      .where({ idOrder: req.params.id })
      .select("OrderDetail.*", "Laptop.tenLaptop");

    // Format numeric values
    order.tongTien = Number(order.tongTien);
    const formattedOrderDetails = orderDetails.map((detail) => ({
      ...detail,
      soLuong: Number(detail.soLuong),
      donGia: Number(detail.donGia),
      thanhTien: Number(detail.thanhTien),
    }));

    res.json({
      ...order,
      orderDetails: formattedOrderDetails,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createOrder = async (req, res) => {
  const trx = await db.transaction();

  try {
    const {
      idCustomer,
      idEmployee,
      idPromotion,
      trangThai,
      ngayDatHang,
      tongTien,
      hinhThucThanhToan,
      platform,
      orderDetails,
    } = req.body;

    // Kiểm tra đầu vào
    if (!trangThai || !ngayDatHang || !hinhThucThanhToan) {
      await trx.rollback();
      return res.status(400).json({
        error: "Vui lòng cung cấp đầy đủ thông tin đơn hàng",
      });
    }

    if (tongTien === undefined || isNaN(tongTien)) {
      await trx.rollback();
      return res.status(400).json({ error: "Tổng tiền không hợp lệ" });
    }

    if (!Array.isArray(orderDetails) || orderDetails.length === 0) {
      await trx.rollback();
      return res.status(400).json({
        error: "Chi tiết đơn hàng phải là mảng và không được rỗng",
      });
    }

    for (const [index, detail] of orderDetails.entries()) {
      if (!detail.idLaptop) {
        await trx.rollback();
        return res
          .status(400)
          .json({ error: `Chi tiết đơn hàng [${index}] thiếu idLaptop` });
      }
      if (!detail.soLuong || detail.soLuong <= 0) {
        await trx.rollback();
        return res.status(400).json({
          error: `Chi tiết đơn hàng [${index}] số lượng không hợp lệ`,
        });
      }
      if (!detail.donGia || detail.donGia < 0) {
        await trx.rollback();
        return res.status(400).json({
          error: `Chi tiết đơn hàng [${index}] đơn giá không hợp lệ`,
        });
      }
    }

    // Gộp chi tiết
    const groupedDetails = {};
    for (const detail of orderDetails) {
      if (groupedDetails[detail.idLaptop]) {
        groupedDetails[detail.idLaptop].soLuong += detail.soLuong;
        groupedDetails[detail.idLaptop].thanhTien +=
          detail.soLuong * detail.donGia;
      } else {
        groupedDetails[detail.idLaptop] = {
          idLaptop: detail.idLaptop,
          soLuong: detail.soLuong,
          donGia: detail.donGia,
          thanhTien: detail.soLuong * detail.donGia,
        };
      }
    }

    // Lấy idOrder lớn nhất
    const maxIdResult = await trx("Order").max("idOrder as maxId").first();
    const newIdOrder = (maxIdResult?.maxId || 0) + 1;

    // Tạo đơn hàng
    await trx("Order").insert({
      idOrder: newIdOrder,
      idCustomer,
      idEmployee,
      idPromotion,
      trangThai,
      ngayDatHang,
      tongTien,
      hinhThucThanhToan,
      platform: platform || "pos",
    });

    // Tạo chi tiết đơn hàng và cập nhật kho
    for (const detail of Object.values(groupedDetails)) {
      await trx("OrderDetail").insert({
        idOrder: newIdOrder,
        idLaptop: detail.idLaptop,
        soLuong: detail.soLuong,
        donGia: detail.donGia,
        thanhTien: detail.thanhTien,
      });

      await updateInventory(trx, detail.idLaptop, -detail.soLuong);
    }

    // Tính điểm
    if (trangThai === "Hoàn Thành" && idCustomer != null) {
      const pointsToAdd = Math.floor(tongTien / pointPerCash);
      await updateCustomerLoyalty(trx, idCustomer, pointsToAdd, newIdOrder);
    }

    await trx.commit();

    res.status(201).json({
      success: true,
      message: "Tạo đơn hàng thành công",
      idOrder: newIdOrder,
    });
  } catch (err) {
    await trx.rollback();
    console.error("[ERROR] createOrder:", err);
    res.status(500).json({
      error: "Lỗi máy chủ: không thể tạo đơn hàng",
      detail: err.message,
    });
  }
};

// Update order
const updateOrder = async (req, res) => {
  // Start a transaction
  const trx = await db.transaction();

  try {
    const {
      idCustomer,
      idEmployee,
      trangThai,
      ngayDatHang,
      tongTien,
      hinhThucThanhToan,
      idPromotion,
    } = req.body;

    // Get original order for status change detection
    const originalOrder = await trx("Order")
      .where({ idOrder: req.params.id })
      .first();

    if (!originalOrder) {
      await trx.rollback();
      return res.status(404).json({ error: "Order not found" });
    }

    // Update order
    await trx("Order").where({ idOrder: req.params.id }).update({
      idCustomer,
      idEmployee,
      trangThai,
      ngayDatHang,
      tongTien,
      hinhThucThanhToan,
      idPromotion,
    });

    // If order was not completed before but is completed now, add loyalty points
    if (
      originalOrder.trangThai !== "Hoàn thành" &&
      trangThai === "Hoàn thành"
    ) {
      const pointsToAdd = Math.floor(tongTien / pointPerCash);
      await updateCustomerLoyalty(trx, idCustomer, pointsToAdd, req.params.id);
    }

    // Commit the transaction
    await trx.commit();

    // Fetch the updated order
    const updatedOrder = await db("Order")
      .where({ idOrder: req.params.id })
      .first();

    res.json(updatedOrder);
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  // Start a transaction
  const trx = await db.transaction();

  try {
    // Get order details to restore inventory
    const orderDetails = await trx("OrderDetail").where({
      idOrder: req.params.id,
    });

    // Restore inventory quantities
    for (const detail of orderDetails) {
      await updateInventory(trx, detail.idLaptop, detail.soLuong);
    }

    // Delete order (cascades to OrderDetail)
    const deleted = await trx("Order").where({ idOrder: req.params.id }).del();

    if (!deleted) {
      await trx.rollback();
      return res.status(404).json({ error: "Order not found" });
    }

    // Commit the transaction
    await trx.commit();

    res.status(204).send();
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to update inventory
async function updateInventory(trx, idLaptop, quantityChange) {
  try {
    // Check if laptop exists in inventory
    const inventory = await trx("Inventory").where({ idLaptop }).first();

    if (inventory) {
      // Update existing inventory
      await trx.raw(
        `UPDATE "Inventory" SET "soLuong" = "soLuong" + ? WHERE "idLaptop" = ?`,
        [quantityChange, idLaptop]
      );

      // Check if inventory is below zero and throw error if it is
      const updatedInventory = await trx("Inventory")
        .where({ idLaptop })
        .first();

      if (updatedInventory.soLuong < 0) {
        throw new Error(`Không đủ số lượng laptop (ID: ${idLaptop}) trong kho`);
      }
    } else if (quantityChange > 0) {
      // Create new inventory entry
      await trx("Inventory").insert({
        idLaptop,
        soLuong: quantityChange,
        viTriKho: "Kho chính",
      });
    } else {
      throw new Error(`Laptop (ID: ${idLaptop}) không tồn tại trong kho`);
    }
  } catch (err) {
    console.error("Error updating inventory:", err);
    throw err;
  }
}

// Helper function to update customer loyalty points
async function updateCustomerLoyalty(trx, idCustomer, points, orderId) {
  try {
    // Add points to customer
    await trx("Customer").where({ idCustomer }).increment("diemThuong", points);

    // Record the loyalty transaction
    await trx("LoyaltyTransaction").insert({
      idCustomer,
      loaiGiaoDich: "Tích điểm",
      diem: points,
      moTa: `Tích điểm từ đơn hàng #${orderId}`,
    });

    // Check and update member level if needed
    const customer = await trx("Customer").where({ idCustomer }).first();

    const eligibleLevel = await trx("MemberLevel")
      .where("diemCanDat", "<=", customer.diemThuong)
      .orderBy("diemCanDat", "desc")
      .first();

    if (
      eligibleLevel &&
      (!customer.idLevel || customer.idLevel !== eligibleLevel.idLevel)
    ) {
      await trx("Customer")
        .where({ idCustomer })
        .update({ idLevel: eligibleLevel.idLevel });
    }
  } catch (err) {
    console.error("Error updating customer loyalty:", err);
    throw err;
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
