const express = require('express');
const router = express.Router();
const productController = require('../controller/product');
// phân trang 
router.get("/pagination", productController.getAllProductWithPagination);

// lấy sản phẩm theo id của nhà sản xuất
router.get(
  "/manufacturer/:id",
  productController.getProductByManufacturerIdWithPagination
);
// Route definitions
router.get("/", productController.getAllProduct);

router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);


module.exports = router;
