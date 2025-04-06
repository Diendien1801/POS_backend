const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employee');
const { authorizeRole } = require("../middleware/auth");

// Route definitions
router.get('/', employeeController.getAllEmployees);
router.get('/byAccount/:idAccount', authorizeRole('admin', 'warehouse', 'casher'), employeeController.getEmployeeByAccount);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.createEmployee);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);
module.exports = router;