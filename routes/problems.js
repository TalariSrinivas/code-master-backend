const express = require('express');
const router = express.Router();
const Problem = require('../models/problems');

// GET /api/problems
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find({}, { title: 1 }); // Only fetch titles and _id
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/problems/:id — optional, if you want to show full problem on select
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
