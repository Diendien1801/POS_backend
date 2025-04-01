const db = require('../db');

// Get all stock imports
const getAllStockImports = async (req, res) => {
  try {
    const stockImports = await db('StockImport')
      .join('Contractor', 'StockImport.idContractor', '=', 'Contractor.idContractor')
      .select('StockImport.*', 'Contractor.field as tenNhaCungCap');
    
    // Format numeric values
    const formattedImports = stockImports.map(item => ({
      ...item,
      tongTien: Number(item.tongTien)
    }));
    
    res.json(formattedImports);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get stock import by ID
const getStockImportById = async (req, res) => {
  try {
    const stockImport = await db('StockImport')
      .join('Contractor', 'StockImport.idContractor', '=', 'Contractor.idContractor')
      .where({ 'StockImport.idPhieuNhap': req.params.id })
      .select('StockImport.*', 'Contractor.field as tenNhaCungCap')
      .first();
      
    if (!stockImport) {
      return res.status(404).json({ error: 'Stock import not found' });
    }
    
    // Convert decimal to number
    stockImport.tongTien = Number(stockImport.tongTien);
    
    res.json(stockImport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new stock import
const createStockImport = async (req, res) => {
  try {
    const { idContractor, ngayNhap, tongTien } = req.body;
    
    if (!idContractor || !ngayNhap || tongTien === undefined) {
      return res.status(400).json({ error: 'Contractor, date and total amount are required' });
    }
    
    const [id] = await db('StockImport').insert({
      idContractor,
      ngayNhap,
      tongTien
    }).returning('idPhieuNhap');
    
    const newStockImport = await db('StockImport')
      .where({ idPhieuNhap: id })
      .first();
      
    res.status(201).json(newStockImport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update stock import
const updateStockImport = async (req, res) => {
  try {
    const { idContractor, ngayNhap, tongTien } = req.body;
    
    const updated = await db('StockImport')
      .where({ idPhieuNhap: req.params.id })
      .update({
        idContractor,
        ngayNhap,
        tongTien
      });
      
    if (!updated) {
      return res.status(404).json({ error: 'Stock import not found' });
    }
    
    const stockImport = await db('StockImport')
      .where({ idPhieuNhap: req.params.id })
      .first();
      
    res.json(stockImport);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete stock import
const deleteStockImport = async (req, res) => {
  try {
    const deleted = await db('StockImport')
      .where({ idPhieuNhap: req.params.id })
      .del();
      
    if (!deleted) {
      return res.status(404).json({ error: 'Stock import not found' });
    }
    
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllStockImports,
  getStockImportById,
  createStockImport,
  updateStockImport,
  deleteStockImport
};