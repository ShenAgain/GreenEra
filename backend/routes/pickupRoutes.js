const express = require('express');
const router = express.Router();
const Pickup = require('../models/pickup');
const mongoose = require('mongoose');


// route for scheduling a pickup
router.post('/schedule', async (req, res) => {
  const { date, time, wasteType, address, userId, status = 'Pending' } = req.body;
  try {
    // Validate fields
    if (!date || !time || !wasteType || !address || !userId) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const pickup = new Pickup({ date, time, wasteType, address, userId, status });
    await pickup.save();
    res.status(201).json({ message: 'Pickup scheduled successfully' });
  } catch (error) {
    console.error('Error scheduling pickup:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// route for fetching pickup history
router.get('/pickup-history', async (req, res) => {
  try {
    const history = await Pickup.find({ userId: req.query.userId });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
