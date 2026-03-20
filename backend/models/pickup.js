const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  wasteType: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }, 
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);