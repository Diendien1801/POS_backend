const express = require('express');
const router = express.Router();
const manufacturerController = require('../controller/manufacturer');

// Route definitions
router.get("/", manufacturerController.getAllManufacturer);
module.exports = router;