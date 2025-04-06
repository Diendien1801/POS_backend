const express = require('express');
const router = express.Router();
const accountController = require('../controller/account');
const { authorizeRole } = require('../middleware/auth');

router.post('/login', accountController.login);

// ✅ Chỉ admin mới được truy cập
router.get('/', authorizeRole('admin'), accountController.getAllAccounts);

// ✅ Những route khác
router.get('/:id', authorizeRole('admin', 'casher'), accountController.getAccountById);
router.put('/:id', authorizeRole('admin'), accountController.updateAccount);
router.delete('/:id', authorizeRole('admin'), accountController.deleteAccount);


module.exports = router;
