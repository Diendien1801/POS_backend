const express = require("express");
const router = express.Router();
const homeController = require("../controller/home");

// Route definitions
router.get("/LaptopSaleToday", homeController.getLaptopSaleToday);
router.get("/MonthlyRevenue", homeController.getMonthlyRevenue);
router.get("/DailySale", homeController.getDailySale);

// Get inventory's Laptop Low stock
router.get("/LaptopLowStock", homeController.getLaptopLowStock);
module.exports = router;
