const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// Router
const router = express.Router();

// Routes ----------------------------------------------------------------------

/**
 * GET / - Base API endpoint
 */
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the RBAC Tutorial! This is the server.' });
});

/**
 * POST /register - Register a new user
 */
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(200).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: `Error registering user: ${error.message}` });
  }
});

module.exports = router;
