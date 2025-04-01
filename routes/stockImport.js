const express = require('express');
const router = express.Router();
const stockImportController = require('../controller/stockImport');

// Route definitions
router.get('/', stockImportController.getAllStockImports);
router.get('/:id', stockImportController.getStockImportById);
router.post('/', stockImportController.createStockImport);
router.put('/:id', stockImportController.updateStockImport);
router.delete('/:id', stockImportController.deleteStockImport);

module.exports = router;