const mongoose = require('mongoose');

const simCardSchema = new mongoose.Schema({
  simNumber: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  activationDate: {
    type: Date
  }
});

const SimCard = mongoose.model('SimCard', simCardSchema);

module.exports = SimCard;
