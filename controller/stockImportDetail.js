const db = require('../db');


const parseIdParam = (idParam) => {
  let id = idParam;

  // Check if it's a stringified JSON object
  if (typeof id === "string" && id.includes("{")) {
    try {
      const parsedObj = JSON.parse(id);
      id = parsedObj.idStockImportDetail;
    } catch (e) {
      // If parsing fails, continue with the original value
    }
  }

  return parseInt(id, 10);
};

// Get all stock import details
const getAllStockImportDetails = async (req, res) => {
  try {
    let query = db('StockImportDetail')
      .join('Laptop', 'StockImportDetail.idLaptop', '=', 'Laptop.idLaptop')
      .join('StockImport', 'StockImportDetail.idPhieuNhap', '=', 'StockImport.idPhieuNhap')
      .select(
        'StockImportDetail.*', 
        'Laptop.tenLaptop', 
        'StockImport.ngayNhap'
      );
      
    // Filter by import ID if provided
    if (req.query.importId) {
      query = query.where('StockImportDetail.idPhieuNhap', req.query.importId);
    }
    
    const details = await query;
    
    // Format numeric values
    const formattedDetails = details.map(detail => ({
      ...detail,
      soLuong: Number(detail.soLuong),
      giaNhap: Number(detail.giaNhap)
    }));
    
    res.json(formattedDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get stock import detail by ID ( stock import ID )
const getStockImportDetailById = async (req, res) => {
  try {
    const detailId = parseIdParam(req.params.id);
    const details = await db('StockImportDetail')
      .join('Laptop', 'StockImportDetail.idLaptop', '=', 'Laptop.idLaptop')
      .join('StockImport', 'StockImportDetail.idPhieuNhap', '=', 'StockImport.idPhieuNhap')
      .where({ 'StockImportDetail.idPhieuNhap': detailId })
      .select(
        'StockImportDetail.*', 
        'Laptop.tenLaptop', 
        'StockImport.ngayNhap'
      );
      
    if (!details || details.length === 0) {
      return res.status(404).json({ error: 'No stock import details found for this import ID' });
    }
    
    const formattedDetails = details.map(detail => ({
      ...detail,
      soLuong: Number(detail.soLuong),
      giaNhap: Number(detail.giaNhap)
    }));
    
    res.json(formattedDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new stock import detail
const createStockImportDetail = async (req, res) => {
  try {
    const { idPhieuNhap, idLaptop, soLuong, giaNhap } = req.body;
    
    if (!idPhieuNhap || !idLaptop || soLuong === undefined || giaNhap === undefined) {
      return res.status(400).json({ error: 'Import ID, laptop ID, quantity and price are required' });
    }
    
    // Insert the new detail
    const result = await db('StockImportDetail').insert({
      idPhieuNhap,
      idLaptop,
      soLuong,
      giaNhap
    }).returning('idStockImportDetail');
    
    // Extract the ID properly whether it's an object or plain value
    const id = typeof result[0] === 'object' ? result[0].idStockImportDetail : result[0];
    
    // Use the extracted numeric ID
    const newDetail = await db('StockImportDetail')
      .where({ idStockImportDetail: id })
      .first();
      
    res.status(201).json(newDetail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Update stock import detail
const updateStockImportDetail = async (req, res) => {
  try {
    const { idPhieuNhap, idLaptop, soLuong, giaNhap } = req.body;
    
    const detailId = parseIdParam(req.params.id);
    // Get the original detail to calculate inventory adjustment
    const originalDetail = await db('StockImportDetail')
      .where({ idStockImportDetail: detailId })
      .first();
      
    if (!originalDetail) {
      return res.status(404).json({ error: 'Stock import detail not found' });
    }
    
    const updated = await db('StockImportDetail')
      .where({ idStockImportDetail: detailId })
      .update({
        idPhieuNhap,
        idLaptop,
        soLuong,
        giaNhap
      });
    
    // Update inventory - adjust for the difference
    if (originalDetail.idLaptop === idLaptop) {
      // Same laptop, just update quantity difference
      const quantityDiff = soLuong - originalDetail.soLuong;
      if (quantityDiff !== 0) {
        await updateInventory(idLaptop, quantityDiff);
      }
    } else {
      // Different laptop, remove from old and add to new
      await updateInventory(originalDetail.idLaptop, -originalDetail.soLuong);
      await updateInventory(idLaptop, soLuong);
    }
    
    const detail = await db('StockImportDetail')
      .where({ idStockImportDetail: detailId })
      .first();
      
    res.json(detail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete stock import detail
const deleteStockImportDetail = async (req, res) => {
  try {
    // Get the detail first to update inventory
    const detailId = parseIdParam(req.params.id);
    const detail = await db('StockImportDetail')
      .where({ idStockImportDetail: detailId })
      .first();
      
    if (!detail) {
      return res.status(404).json({ error: 'Stock import detail not found' });
    }
    
    const deleted = await db('StockImportDetail')
      .where({ idStockImportDetail: detailId })
      .del();
    
    // Update inventory - remove the quantity
    await updateInventory(detail.idLaptop, -detail.soLuong);
    
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Helper function to update inventory
async function updateInventory(idLaptop, quantityChange) {
  try {
    // Check if laptop exists in inventory
    const inventory = await db('Inventory')
      .where({ idLaptop })
      .first();
      
    if (inventory) {
      // Update existing inventory
      await db('Inventory')
        .where({ idLaptop })
        .update({
          soLuong: db.raw(`soLuong + ${quantityChange}`)
        });
    } else if (quantityChange > 0) {
      // Create new inventory entry
      await db('Inventory').insert({
        idLaptop,
        soLuong: quantityChange,
        viTriKho: 'Mặc định'
      });
    }
  } catch (err) {
    console.error('Error updating inventory:', err);
    throw err;
  }
}

const resetSequence = async (req, res) => {
  try {
    await db.raw("SELECT setval('\"StockImportDetail_idStockImportDetail_seq\"', (SELECT MAX(\"idStockImportDetail\") FROM \"StockImportDetail\"));");
    
    res.json({ 
      success: true,
      message: 'StockImportDetail sequence has been reset successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      error: 'Internal server error',
      message: err.message 
    });
  }
};


module.exports = {
  getAllStockImportDetails,
  getStockImportDetailById,
  createStockImportDetail,
  updateStockImportDetail,
  deleteStockImportDetail,
  resetSequence
};