// routes/momoRoutes.js
const express = require("express");
const router = express.Router();
const { createMoMoPayment, checkMoMoPaymentStatus } = require("../controller/momoController");

// POST /api/payment/momo
router.post("/momo", createMoMoPayment);
router.get(
  "/momo/status/:transactionId",
  checkMoMoPaymentStatus
);
module.exports = router;
