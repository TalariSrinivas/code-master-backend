const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
  contestId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  info: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  stopTime: {
    type: Date,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
