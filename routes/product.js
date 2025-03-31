const express = require('express');
const router = express.Router();
const productController = require('../controller/product');

// Route definitions
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
