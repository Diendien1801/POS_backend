const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

// Middleware to log the request details
const requestLogger = (req, res, next) => {
    console.log('API call received:', {
      url: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    });
    next(); // Important: continue to the next middleware/route handler
  };
  


// Apply the middleware to all product routes
router.use(requestLogger);

// Route definitions
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.post("/reset-sequences", productController.resetSequence);

module.exports = router;
