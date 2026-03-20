const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');
const User = require('../models/user');

// Middleware to check admin role
async function checkAdminRole(req, res, next) {
    try {
      const user = await User.findById(req.userId); // Assuming userId is set in req
      if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  
// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new notification
router.post('/', async (req, res) => {
  try {
    const { message, eventType, date, communityName, createdBy } = req.body;
    const notification = new Notification({
      message,
      eventType,
      date,
      communityName,
      createdBy
    });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;