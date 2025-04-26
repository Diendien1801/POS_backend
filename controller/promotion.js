const db = require('../db');

// GET /api/promotions
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await db('Promotion').select('*');
    res.json({
      success: true,
      data: promotions,
      message: 'Fetched all promotions'
    });
  } catch (err) {
    console.error("🔥 getAllPromotions error:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// POST /api/promotions
const createPromotion = async (req, res) => {
  const { tenKhuyenMai, moTa, giaTriGiam, ngayBatDau, ngayKetThuc } = req.body;

  if (!tenKhuyenMai || !giaTriGiam || !ngayBatDau || !ngayKetThuc) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Missing required fields'
    });
  }

  try {
    // Get the latest ID from the Promotion table
    const latestPromotion = await db('Promotion')
      .max('idPromotion as maxId')
      .first();
      
    const newId = latestPromotion.maxId ? Number(latestPromotion.maxId) + 1 : 1;
    
    // Insert with the new ID
    const [newPromotion] = await db('Promotion')
      .insert({ 
        idPromotion: newId,
        tenKhuyenMai, 
        moTa, 
        giaTriGiam, 
        ngayBatDau, 
        ngayKetThuc 
      })
      .returning('*');

    res.status(201).json({
      success: true,
      data: newPromotion,
      message: 'Promotion created'
    });
  } catch (err) {
    console.error("🔥 createPromotion error:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// GET /api/promotions/:id
const getPromotionById = async (req, res) => {
  const { id } = req.params;

  try {
    const promotion = await db('Promotion').where('idPromotion', id).first();

    if (!promotion) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Promotion not found'
      });
    }

    res.json({
      success: true,
      data: promotion,
      message: 'Fetched promotion'
    });
  } catch (err) {
    console.error("🔥 getPromotionById error:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// PUT /api/promotions/:id
const updatePromotion = async (req, res) => {
  const { id } = req.params;
  const { tenKhuyenMai, moTa, giaTriGiam, ngayBatDau, ngayKetThuc } = req.body;

  try {
    const [updated] = await db('Promotion')
      .where('idPromotion', id)
      .update({ tenKhuyenMai, moTa, giaTriGiam, ngayBatDau, ngayKetThuc })
      .returning('*');

    if (!updated) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Promotion not found'
      });
    }

    res.json({
      success: true,
      data: updated,
      message: 'Promotion updated'
    });
  } catch (err) {
    console.error("🔥 updatePromotion error:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// DELETE /api/promotions/:id
const deletePromotion = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db('Promotion')
      .where('idPromotion', id)
      .del();

    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Promotion not found'
      });
    }

    res.json({
      success: true,
      data: null,
      message: 'Promotion deleted'
    });
  } catch (err) {
    console.error("🔥 deletePromotion error:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

module.exports = {
  getAllPromotions,
  createPromotion,
  getPromotionById,
  updatePromotion,
  deletePromotion
};
