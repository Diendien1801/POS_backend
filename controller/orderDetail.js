const db = require("../db");

// Get all order details
const getAllOrderDetails = async (req, res) => {
  try {
    let query = db('OrderDetail')
      .join('Order', 'OrderDetail.idOrder', '=', 'Order.idOrder')
      .join('Laptop', 'OrderDetail.idLaptop', '=', 'Laptop.idLaptop')
      .select(
        'OrderDetail.*',
        'Order.ngayDatHang',
        'Order.trangThai',
        'Laptop.tenLaptop'
      );
    
    // Filter by order ID if provided
    if (req.query.orderId) {
      query = query.where('OrderDetail.idOrder', req.query.orderId);
    }
    
    const orderDetails = await query;
    
    // Format numeric values
    const formattedDetails = orderDetails.map(detail => ({
      ...detail,
      soLuong: Number(detail.soLuong),
      donGia: Number(detail.donGia),
      thanhTien: Number(detail.thanhTien)
    }));
    
    res.json(formattedDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get order detail by ID
const getOrderDetailById = async (req, res) => { // Get order detail by IDorder ID
  try {
    // Use idOrder instead of idOrderDetail in the WHERE clause
    const orderDetails = await db("OrderDetail")
      .join("Order", "OrderDetail.idOrder", "=", "Order.idOrder")
      .join("Laptop", "OrderDetail.idLaptop", "=", "Laptop.idLaptop")
      .where({ "OrderDetail.idOrder": req.params.id })
      .select(
        "OrderDetail.*",
        "Order.ngayDatHang",
        "Order.trangThai",
        "Laptop.tenLaptop"
      );

    // If no details found, return 404
    if (!orderDetails || orderDetails.length === 0) {
      return res.status(404).json({ error: "No order details found for this order" });
    }

    // Format numeric values
    const formattedDetails = orderDetails.map(detail => ({
      ...detail,
      soLuong: Number(detail.soLuong),
      donGia: Number(detail.donGia),
      thanhTien: Number(detail.thanhTien)
    }));

    res.json(formattedDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create new order detail
const createOrderDetail = async (req, res) => {
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    const { idOrder, idLaptop, soLuong, donGia } = req.body;
    
    if (!idOrder || !idLaptop || soLuong === undefined || donGia === undefined) {
      await trx.rollback();
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Calculate total
    const thanhTien = soLuong * donGia;
    
    // Check inventory
    const inventory = await trx('Inventory')
      .where({ idLaptop })
      .first();
      
    if (!inventory || inventory.soLuong < soLuong) {
      await trx.rollback();
      return res.status(400).json({ error: 'Insufficient inventory' });
    }
    
    // Insert order detail
    const [orderDetailId] = await trx('OrderDetail').insert({
      idOrder,
      idLaptop,
      soLuong,
      donGia,
      thanhTien
    });
    
    // Update order total
    await updateOrderTotal(trx, idOrder);
    
    // Update inventory
    await trx.raw(`UPDATE "Inventory" SET "soLuong" = "soLuong" - ? WHERE "idLaptop" = ?`, 
      [soLuong, idLaptop]);
    
    // Commit the transaction
    await trx.commit();
    
    // Fetch the newly created order detail
    const newOrderDetail = await db('OrderDetail')
      .where({ idOrderDetail: orderDetailId })
      .first();
      
    res.status(201).json(newOrderDetail);
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update order detail
const updateOrderDetail = async (req, res) => {
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    const { idOrder, idLaptop, soLuong, donGia } = req.body;
    
    // Get original order detail
    const originalDetail = await trx('OrderDetail')
      .where({ idOrderDetail: req.params.id })
      .first();
      
    if (!originalDetail) {
      await trx.rollback();
      return res.status(404).json({ error: 'Order detail not found' });
    }
    
    // Calculate total
    const thanhTien = soLuong * donGia;
    
    // Calculate inventory change
    let inventoryChange = 0;
    if (originalDetail.idLaptop === idLaptop) {
      // Same product, just update quantity
      inventoryChange = originalDetail.soLuong - soLuong;
    } else {
      // Different product, restore old and remove new
      await trx.raw(`UPDATE "Inventory" SET "soLuong" = "soLuong" + ? WHERE "idLaptop" = ?`, 
        [originalDetail.soLuong, originalDetail.idLaptop]);
      inventoryChange = -soLuong;
    }
    
    // Check inventory if we're removing more
    if (inventoryChange < 0) {
      const inventory = await trx('Inventory')
        .where({ idLaptop })
        .first();
        
      if (!inventory || inventory.soLuong < Math.abs(inventoryChange)) {
        await trx.rollback();
        return res.status(400).json({ error: 'Insufficient inventory' });
      }
    }
    
    // Update inventory
    await trx.raw(`UPDATE "Inventory" SET "soLuong" = "soLuong" + ? WHERE "idLaptop" = ?`, 
      [inventoryChange, idLaptop]);
    
    // Update order detail
    await trx('OrderDetail')
      .where({ idOrderDetail: req.params.id })
      .update({
        idOrder,
        idLaptop,
        soLuong,
        donGia,
        thanhTien
      });
    
    // Update order total
    await updateOrderTotal(trx, idOrder);
    
    // If order changed, update the original order total too
    if (originalDetail.idOrder !== idOrder) {
      await updateOrderTotal(trx, originalDetail.idOrder);
    }
    
    // Commit the transaction
    await trx.commit();
    
    // Fetch the updated order detail
    const updatedOrderDetail = await db('OrderDetail')
      .where({ idOrderDetail: req.params.id })
      .first();
      
    res.json(updatedOrderDetail);
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete order detail
const deleteOrderDetail = async (req, res) => {
  // Start a transaction
  const trx = await db.transaction();
  
  try {
    // Get the detail to restore inventory and update order total
    const detail = await trx('OrderDetail')
      .where({ idOrderDetail: req.params.id })
      .first();
      
    if (!detail) {
      await trx.rollback();
      return res.status(404).json({ error: 'Order detail not found' });
    }
    
    const idOrder = detail.idOrder;
    
    // Delete the detail
    await trx('OrderDetail')
      .where({ idOrderDetail: req.params.id })
      .del();
    
    // Restore inventory
    await trx.raw(`UPDATE "Inventory" SET "soLuong" = "soLuong" + ? WHERE "idLaptop" = ?`, 
      [detail.soLuong, detail.idLaptop]);
    
    // Update order total
    await updateOrderTotal(trx, idOrder);
    
    // Commit the transaction
    await trx.commit();
    
    res.status(204).send();
  } catch (err) {
    await trx.rollback();
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to update order total
async function updateOrderTotal(trx, idOrder) {
  try {
    // Calculate order total from details
    const result = await trx('OrderDetail')
      .where({ idOrder })
      .sum('thanhTien as total')
      .first();
    
    const total = result.total || 0;
    
    // Update order total
    await trx('Order')
      .where({ idOrder })
      .update({ tongTien: total });
  } catch (err) {
    console.error('Error updating order total:', err);
    throw err;
  }
}

module.exports = {
  getAllOrderDetails,
  getOrderDetailById,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
};