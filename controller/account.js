const db = require('../db');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const user = await db('Account').where({ username }).first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.matKhau);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
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
      token,
      user: {
        id: user.idAccount,
        username: user.username,
        role: user.role
      }
    });
  } catch (err) {
    console.error("🔥 LOGIN ERROR:", err); // 👈 In lỗi chi tiết
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Get all accounts
const getAllAccounts = async (req, res) => {
  try {
    let query = db('Account').select('*');
    
    // If a username query parameter is provided, filter by username
    if (req.query.username) {
      query = query.where({ username: req.query.username });
      // Or for partial matching:
      // query = query.where('username', 'like', `%${req.query.username}%`);
    }
    
    const accounts = await query;
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Get account by ID
const getAccountById = async (req, res) => {
  try {
    const account = await db('Account')
      .where({ idAccount: req.params.id })
      .first();

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new account
const createAccount = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const [id] = await db('Account').insert({
      username,
      password,
      role
    }).returning('idAccount');

    const newAccount = await db('Account')
      .where({ idAccount: id })
      .first();

    res.status(201).json(newAccount);
  } catch (err) {
    console.error(err);

    if (err.code === '23505') { // Unique constraint
      return res.status(409).json({ error: 'Username already exists' });
    }

    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update account
const updateAccount = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const updated = await db('Account')
      .where({ idAccount: req.params.id })
      .update({
        username,
        password,
        role
      });

    if (!updated) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const account = await db('Account')
      .where({ idAccount: req.params.id })
      .first();

    res.json(account);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete account
const deleteAccount = async (req, res) => {
  try {
    const deleted = await db('Account')
      .where({ idAccount: req.params.id })
      .del();

    if (!deleted) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
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
