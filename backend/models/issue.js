// models/issue.js
const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issueType: String,
  description: String,
  location: String,
  additionalComments: String,
  photos: [String], // Array to store photo URLs if needed
  status: { type: String, default: 'NEW' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Issue', issueSchema);
