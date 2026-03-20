const mongoose = require('mongoose');

const communitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  pickupSchedule: {
    days: [String],
    times: [String]
  }
});

module.exports = mongoose.model('Community', communitySchema);
