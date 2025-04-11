const db = require('../db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      data: null,
      message: 'Username and password are required'
    });
  }

  try {
    const user = await db('Account').where({ username }).first();

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Invalid credentials'
      });
    }

    const validPassword = await bcrypt.compare(password, user.matKhau);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      {
        sub: user.idAccount,
        username: user.username,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      success: true,
      data: {
        idAccount: user.idAccount,
        username: user.username,
        role: user.role,
        token
      },
      message: 'Login successful'
    });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// ✅ Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    let query = db('Account').select('*');
    if (req.query.username) {
      query = query.where({ username: req.query.username });
    }

    const accounts = await query;

    res.json({
      success: true,
      data: accounts,
      message: 'Accounts retrieved successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};


// ✅ Get account by ID
const getAccountById = async (req, res) => {
  try {
    const account = await db('Account')
      .where({ idAccount: req.params.id })
      .first();

    if (!account) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Account not found'
      });
    }

    res.json({
      success: true,
      data: account,
      message: 'Account retrieved successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// ✅ Create new account
const createAccount = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Username and password are required'
      });
    }

    const [id] = await db('Account').insert({
      username,
      matKhau: password,
      role
    }).returning('idAccount');

    const newAccount = await db('Account').where({ idAccount: id }).first();

    res.status(201).json({
      success: true,
      data: newAccount,
      message: 'Account created successfully'
    });
  } catch (err) {
    console.error(err);
    if (err.code === '23505') {
      return res.status(409).json({
        success: false,
        data: null,
        message: 'Username already exists'
      });
    }

    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// ✅ Update account
const updateAccount = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const updated = await db('Account')
      .where({ idAccount: req.params.id })
      .update({
        username,
        matKhau: password,
        role
      });

    if (!updated) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Account not found'
      });
    }

    const account = await db('Account')
      .where({ idAccount: req.params.id })
      .first();

    res.json({
      success: true,
      data: account,
      message: 'Account updated successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};

// ✅ Delete account
const deleteAccount = async (req, res) => {
  try {
    const deleted = await db('Account')
      .where({ idAccount: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Account not found'
      });
    }

    res.status(200).json({
      success: true,
      data: null,
      message: 'Account deleted successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error'
    });
  }
};



module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
  login
};
