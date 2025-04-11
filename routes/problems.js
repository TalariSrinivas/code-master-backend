const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');

// ✅ GET /api/problems — Sorted by questionNumber
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ questionNumber: 1 }); // Sort by questionNumber (ascending)
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ GET /api/problems/:id — Get full problem by ID
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
