// models/Problem.js

const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  questionNumber: { type: Number, required: true, unique: true }, // Added question number
  title: { type: String, required: true },
  description: { type: String, required: true },
  inputFormat: { type: String, required: true },
  outputFormat: { type: String, required: true },
  sampleCases: [
    {
      input: { type: String, required: true },
      output: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model('problems', ProblemSchema);
