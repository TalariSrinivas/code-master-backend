const mongoose = require('mongoose');

const contestQuestionSchema = new mongoose.Schema({
  contestId: {
    type: String,
    required: true,
    ref: 'Contest' // Referencing the Contest model
  },
  question: {
    type: String,
    required: true
  },
  input: {
    type: String,
    required: true
  },
  output: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const ContestQuestion = mongoose.model('ContestQuestion', contestQuestionSchema);
module.exports = ContestQuestion;
