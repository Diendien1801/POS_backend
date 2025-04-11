const express = require('express');
const router = express.Router();
const promotionController = require('../controller/promotion');
const { authorizeRole } = require('../middleware/auth');

// ⚠️ Chỉ admin mới được phép
router.get('/', authorizeRole('admin'), promotionController.getAllPromotions);
router.post('/', authorizeRole('admin'), promotionController.createPromotion);
router.get('/:id', authorizeRole('admin'), promotionController.getPromotionById);
router.put('/:id', authorizeRole('admin'), promotionController.updatePromotion);
router.delete('/:id', authorizeRole('admin'), promotionController.deletePromotion);

module.exports = router;
