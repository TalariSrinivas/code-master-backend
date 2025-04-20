const express = require('express');
const router = express.Router();
const Contest = require('../models/contest');

router.post('/create-contest', async (req, res) => {
  try {
    const { contestId, password, info, startTime, stopTime } = req.body;

    const newContest = new Contest({
      contestId,
      password,
      info,
      startTime,
      stopTime
    });

    await newContest.save();
    res.status(201).json({ message: 'Contest created successfully!' });
  } catch (error) {
    console.error('Error creating contest:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
