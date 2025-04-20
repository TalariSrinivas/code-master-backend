const express = require('express');
const router = express.Router();
const ContestQuestion = require('../models/contestQuestion');

// POST route to create contest questions
router.post('/create-question', async (req, res) => {
  try {
    const { contestId, question, input, output } = req.body;

    const newQuestion = new ContestQuestion({
      contestId,
      question,
      input,
      output
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully!' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET route to get questions by contestId
router.get('/get-questions/:contestId', async (req, res) => {
  try {
    const contestId = req.params.contestId;
    const questions = await ContestQuestion.find({ contestId });

    if (!questions) {
      return res.status(404).json({ message: 'No questions found for this contest.' });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
