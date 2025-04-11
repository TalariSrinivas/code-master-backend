const express = require('express');
const router = express.Router();
const User = require('../models/Users'); // Make sure the path is correct

// GET /api/users/usernames — fetch all usernames
router.get('/usernames', async (req, res) => {
  try {
    const users = await User.find({}, 'username'); // Fetch only the username field
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
