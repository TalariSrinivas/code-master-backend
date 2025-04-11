const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  submissions: [{ type: Number }],
  score: { type: Number, default: 0 } // Add this line
});

const User = mongoose.model('User', userSchema);
module.exports = User;
