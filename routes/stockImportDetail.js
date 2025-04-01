const express = require('express');
const router = express.Router();
const stockImportDetailController = require('../controller/stockImportDetail');

// Route definitions
router.get('/', stockImportDetailController.getAllStockImportDetails);
router.get('/:id', stockImportDetailController.getStockImportDetailById);
router.post('/', stockImportDetailController.createStockImportDetail);
router.put('/:id', stockImportDetailController.updateStockImportDetail);
router.delete('/:id', stockImportDetailController.deleteStockImportDetail);

module.exports = router;