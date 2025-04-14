const mongoose = require('mongoose'); // ✅ required

const smsSchema = new mongoose.Schema({
  phone: String,
  message: String,
  status: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Sms', smsSchema);
