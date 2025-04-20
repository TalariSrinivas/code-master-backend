const express = require('express');
const connectDB = require('./models/db');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const PORT = 5000;
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Routes
const problem = require('./routes/problems');
app.use('/api/problems', problem);

const submit = require('./routes/submit');
app.use('/api/submit', submit);

const contestRoutes = require('./routes/contestRoutes');
app.use('/api/contest', contestRoutes); // ✅ Fixed

const users = require('./routes/users');
app.use('/api/users', users);

app.use('/api/auth', authRoutes);
const contestQuestionRoutes = require('./routes/contestQuestionRoutes');
app.use('/api/contest-question', contestQuestionRoutes); // Add contest question route

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port: ${PORT}`);
});
