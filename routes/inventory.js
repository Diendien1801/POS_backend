const express = require("express");
const router = express.Router();
const inventoryController = require("../controller/inventory");

// GET all inventory
router.get("/", inventoryController.getAllInventory);

// GET a single inventory item by idKho
router.get("/:id", inventoryController.getInventoryByWarehouse);

// CREATE a new inventory item
router.post("/", inventoryController.createInventory);

// UPDATE an existing inventory item
router.put("/:id", inventoryController.updateInventory);

// DELETE an inventory item
router.delete("/:id", inventoryController.deleteInventory);

module.exports = router;
