  // const express = require('express');
  // const router = express.Router();
  // const User = require('../models/User');

  // // Signup
  // router.post('/signup', async (req, res) => {
  //   const { name, email, password, address } = req.body;
  //   try {
  //     const existing = await User.findOne({ email });
  //     if (existing) return res.json({ success: false, message: 'Email already registered' });
  //     await User.create({ name, email, password, address });
  //     res.json({ success: true });
  //   } catch (err) {
  //     res.json({ success: false, message: 'Signup failed' });
  //   }
  // });

  // // Login
  // router.post('/login', async (req, res) => {
  //   const { email, password } = req.body;
  //   try {
  //     const user = await User.findOne({ email, password });
  //     if (!user) return res.json({ success: false, message: 'Invalid credentials' });
  //     res.json({ success: true, user });
  //   } catch (err) {
  //     res.json({ success: false, message: 'Login failed' });
  //   }
  // });

  // module.exports = router;




  const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Signup route
router.post('/signup', async (req, res) => {
  const { name, email, password, address } = req.body;
  
  try {
    // Check if the email is already registered
    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ success: false, message: 'Email already registered' });
    }
    
    // Create a new user
    const newUser = await User.create({ name, email, password, address });
    
    // Respond with success
    res.json({ success: true, message: 'User registered successfully' });
    
  } catch (err) {
    // Handle errors
    console.error(err);
    res.json({ success: false, message: 'Signup failed' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Find user with matching email and password
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Respond with success and user data (if login is successful)
    res.json({ success: true, user });
  } catch (err) {
    // Handle errors
    console.error(err);
    res.json({ success: false, message: 'Login failed' });
  }
});

module.exports = router;
