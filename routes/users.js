const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this path is correct

// ✅ GET /api/users/leaderboard — Get all users sorted by score
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({}, 'username score').sort({ score: -1 });
    res.json(users);
  } catch (err) {
    console.error("Leaderboard error:", err);
    res.status(500).json({ message: 'Error retrieving leaderboard' });
  }
});

// ✅ GET /api/users/:email — Get user by email
router.get('/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: new RegExp(`^${req.params.email}$`, 'i') }); // case-insensitive
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
