const db = require('../db');

// Get all promotions
const getAllPromotions = async (req, res) => {
  try {
    const promotions = await db('Promotion');
    res.json(promotions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a promotion by ID
const getPromotionById = async (req, res) => {
  try {
    const promotion = await db('Promotion')
      .where({ idPromotion: req.params.id })
      .first();

    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    res.json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new promotion
const createPromotion = async (req, res) => {
  try {
    const [idPromotion] = await db('Promotion')
      .insert(req.body)
      .returning('idPromotion');
    res.status(201).json({ idPromotion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an existing promotion
const updatePromotion = async (req, res) => {
  try {
    const count = await db('Promotion')
      .where({ idPromotion: req.params.id })
      .update(req.body);

    if (!count) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.json({ message: 'Promotion updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a promotion
const deletePromotion = async (req, res) => {
  try {
    const count = await db('Promotion')
      .where({ idPromotion: req.params.id })
      .del();

    if (!count) {
      return res.status(404).json({ error: 'Promotion not found' });
    }
    res.json({ message: 'Promotion deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion
};