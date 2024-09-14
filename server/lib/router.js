const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Router
const router = express.Router();

// Routes ----------------------------------------------------------------------

/**
 * GET / - Base API endpoint
 */
router.get('/', (_req, res) => {
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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate JWT
    // You can test the token at: https://jwt.io/
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, 'secretKey', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
});

module.exports = router;
