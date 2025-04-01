const express = require('express');
const router = express.Router();
const orderDetailController = require('../controller/orderDetail');

// Route definitions
router.get('/', orderDetailController.getAllOrderDetails);
router.get('/:id', orderDetailController.getOrderDetailById);
router.post('/', orderDetailController.createOrderDetail);
router.put('/:id', orderDetailController.updateOrderDetail);
router.delete('/:id', orderDetailController.deleteOrderDetail);

module.exports = router;