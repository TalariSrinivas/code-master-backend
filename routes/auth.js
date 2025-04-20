const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save user
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // ✅ Add current login date (without time) if not already in array
    const currentDate = new Date().toISOString().split('T')[0]; // Only the date (YYYY-MM-DD)
    user.loginDates = user.loginDates || []; // Make sure it's defined

    // Convert all existing dates in loginDates to 'YYYY-MM-DD' format for proper comparison
    const formattedLoginDates = user.loginDates.map(date => new Date(date).toISOString().split('T')[0]);

    // Check if current date (YYYY-MM-DD) is already in the loginDates array
    const isDateAlreadyPresent = formattedLoginDates.includes(currentDate);
    
    if (!isDateAlreadyPresent) {
      user.loginDates.push(new Date()); // Push the full date object, which includes the time
      await user.save(); // Save user with updated loginDates
    }

    // Generate Token
    const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
