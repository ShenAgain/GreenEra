// routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

// Endpoint to report an issue
router.post('/report', async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json({ message: 'Issue reported successfully', issueId: issue._id });
  } catch (error) {
    res.status(400).json({ error: 'Error reporting issue' });
  }
});

module.exports = router;
