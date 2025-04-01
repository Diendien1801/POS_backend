const express = require('express');
const router = express.Router();
const accountController = require('../controller/account');


// GET /api/accounts
router.get('/', accountController.getAllAccounts);

// GET /api/accounts/:id
router.get('/:id', accountController.getAccountById);

// POST /api/accounts
router.post('/', accountController.createAccount);

// PUT /api/accounts/:id
router.put('/:id', accountController.updateAccount);

// DELETE /api/accounts/:id
router.delete('/:id', accountController.deleteAccount);


module.exports = router;
