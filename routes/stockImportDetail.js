const express = require('express');
const router = express.Router();
const stockImportDetailController = require('../controller/stockImportDetail');

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
router.get('/', stockImportDetailController.getAllStockImportDetails);
router.get('/:id', stockImportDetailController.getStockImportDetailById);
router.post('/', stockImportDetailController.createStockImportDetail);
router.put('/:id', stockImportDetailController.updateStockImportDetail);
router.delete('/:id', stockImportDetailController.deleteStockImportDetail);
router.post('/reset-sequence', stockImportDetailController.resetSequence);


module.exports = router;