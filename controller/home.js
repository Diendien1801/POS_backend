const knex = require("../db"); // Import knex config
const moment = require("moment"); // Import moment để xử lý ngày tháng

const getLaptopSaleToday = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const totalSold = await knex("OrderDetail")
      .join("Order", "OrderDetail.idOrder", "=", "Order.idOrder")
      .where("Order.ngayDatHang", today)
      .sum("OrderDetail.soLuong as totalQuantity")
      .first();

    return res.status(200).json({
      success: true,
      data: totalSold.totalQuantity || 0, // Trả về 0 nếu không có dữ liệu
      message: "Lấy tổng số lượng laptop đã bán hôm nay thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi lấy tổng số lượng laptop đã bán hôm nay:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại!",
      data: null,
    });
  }
};

const getMonthlyRevenue = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    const startOfMonth = moment(today).startOf("month").format("YYYY-MM-DD");
    const endOfMonth = moment(today).endOf("month").format("YYYY-MM-DD");

    // Truy vấn tổng doanh thu từ bảng Order
    const totalRevenue = await knex("Order")
      .whereBetween("ngayDatHang", [startOfMonth, endOfMonth])
      .sum("tongTien as totalRevenue")
      .first();

    return res.status(200).json({
      success: true,
      data: totalRevenue.totalRevenue || 0, // Trả về 0 nếu không có dữ liệu
      message: "Lấy doanh thu tháng này thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi lấy doanh thu tháng này:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại!",
      data: null,
    });
  }
};


const getDailySale = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    // Lấy tổng doanh thu hôm nay từ bảng Order
    const dailySales = await knex("Order")
      .where("ngayDatHang", today)
      .sum("tongTien as dailySales")
      .first();

    return res.status(200).json({
      success: true,
      data: dailySales.dailySales || 0, // Trả về 0 nếu không có dữ liệu
      message: "Lấy doanh thu hôm nay thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi lấy doanh thu hôm nay:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại!",
      data: null,
    });
  }
};
const getLaptopLowStock = async (req, res) => {

  try {
    // Lấy danh sách laptop có số lượng tồn kho thấp hơn 5
    const lowStockLaptops = await knex("Inventory")
      .join("Laptop", "Inventory.idLaptop", "=", "Laptop.idLaptop")
      .where("Inventory.soLuong", "<", 10)
      .select(
        "Laptop.idLaptop",
        "Laptop.tenLaptop",
        "Laptop.hinhAnh",
        "Laptop.gia",

        "Inventory.soLuong",
        "Inventory.idKho"
      );

    return res.status(200).json({
      success: true,
      data: lowStockLaptops,
      message: "Lấy danh sách laptop tồn kho thấp thành công!",
    });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách laptop tồn kho thấp:", error);
    return res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại!",
      data: null,
    });
  }
}

module.exports = {
  getLaptopSaleToday,
getMonthlyRevenue,
getDailySale,
getLaptopLowStock,
};
