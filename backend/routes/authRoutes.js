const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register route
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, contactNumber, communityName, residentialAddress, role } = req.body;

    if (!role) {
      return res.status(400).json({ message: 'Role is required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      contactNumber,
      communityName,
      residentialAddress,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log error for more details
    res.status(500).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email and role
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: '1h' }
    );


    res.json({
      token,
      userId: user._id,
      role: user.role,
      fullName: user.fullName, 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
