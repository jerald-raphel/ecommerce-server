const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.json({ success: false, message: 'Email already registered' });
    await User.create({ name, email, password, address });
    res.json({ success: true });
  } catch (err) {
    res.json({ success: false, message: 'Signup failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.json({ success: false, message: 'Invalid credentials' });
    res.json({ success: true, user });
  } catch (err) {
    res.json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
