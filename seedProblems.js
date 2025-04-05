const mongoose = require('mongoose');
const Problem = require('./models/problems'); // Import Problem model

// Connect to MongoDB
mongoose.connect('mongodb+srv://srinivas:srinivas123@cluster0.b0wzvpn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Array of Problems
const problems = [
  {
    title: "Sum of Two Numbers",
    description: "Given two integers, return their sum.",
    inputFormat: "Two space-separated integers",
    outputFormat: "A single integer",
    sampleCases: [
      { input: "3 5", output: "8" },
      { input: "7 2", output: "9" }
    ]
  },
  {
    title: "Find the Maximum",
    description: "Given an array of integers, return the maximum element.",
    inputFormat: "N (size of array) followed by N space-separated integers",
    outputFormat: "A single integer, the maximum value",
    sampleCases: [
      { input: "5 1 2 3 4 5", output: "5" },
      { input: "3 10 20 5", output: "20" }
    ]
  }
];

// Insert Data
const insertProblems = async () => {
  try {
    await Problem.insertMany(problems);
    console.log("✅ Problems Inserted Successfully");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error Inserting Problems:", err);
    mongoose.connection.close();
  }
};

// Run the insert function
insertProblems();

