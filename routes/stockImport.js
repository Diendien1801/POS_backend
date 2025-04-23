const express = require('express');
const router = express.Router();
const stockImportController = require('../controller/stockImport');

const requestLogger = (req, res, next) => {
    console.log('StockImport API call received:', {
      url: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    });
    next(); // Important: continue to the next middleware/route handler
  };
  
  // Apply the middleware to all stockImport routes
  router.use(requestLogger);
  

// Route definitions
router.get('/', stockImportController.getAllStockImports);
router.get('/:id', stockImportController.getStockImportById);
router.post('/', stockImportController.createStockImport);
router.put('/:id', stockImportController.updateStockImport);
router.delete('/:id', stockImportController.deleteStockImport);
router.post('/reset-sequences', stockImportController.resetStockImportSequence);

module.exports = router;