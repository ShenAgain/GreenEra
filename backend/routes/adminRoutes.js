const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Community = require('../models/community');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// Admin registration - secured endpoint
router.post('/api/admin/register', auth.validateAdminKey, async (req, res) => {
  try {
    const { fullName, email, password, communityName } = req.body;
    
    // Validate if community exists
    const community = await Community.findOne({ name: communityName });
    if (!community) {
      return res.status(400).json({ message: 'Invalid community' });
    }

    // Check if community already has an admin
    const existingAdmin = await User.findOne({ 
      role: 'admin', 
      communityName: communityName 
    });
    if (existingAdmin) {
      return res.status(400).json({ 
        message: 'Community already has an administrator' 
      });
    }

    // Create admin account
    const admin = new User({
      fullName,
      email,
      password: hashedPassword,
      role: 'admin',
      communityName
    });
    await admin.save();
    
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;