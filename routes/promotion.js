const express = require('express');
const router = express.Router();
const promotionController = require('../controller/promotion');
const { authorizeRole } = require('../middleware/auth');

// ⚠️ Chỉ admin mới được phép
router.get('/', authorizeRole('admin'), controller.getAllPromotions);
router.post('/', authorizeRole('admin'), controller.createPromotion);
router.get('/:id', authorizeRole('admin'), controller.getPromotionById);
router.put('/:id', authorizeRole('admin'), controller.updatePromotion);
router.delete('/:id', authorizeRole('admin'), controller.deletePromotion);

module.exports = router;
