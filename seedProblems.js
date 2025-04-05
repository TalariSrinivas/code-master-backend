const mongoose = require('mongoose');
const Problem = require('./models/problems'); // Import Problem model

// Connect to MongoDB
mongoose.connect('mongodb+srv://srinivas:srinivas123@cluster0.b0wzvpn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Connection Error:", err));

// Array of Problems with questionNumber
const problems = [
  {
    questionNumber: 1,
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
    questionNumber: 2,
    title: "Find the Maximum",
    description: "Given an array of integers, return the maximum element.",
    inputFormat: "N (size of array) followed by N space-separated integers",
    outputFormat: "A single integer, the maximum value",
    sampleCases: [
      { input: "5 1 2 3 4 5", output: "5" },
      { input: "3 10 20 5", output: "20" }
    ]
  },
  {
    questionNumber: 3,
    title: "Palindrome Checker",
    description: "Check if a given string is a palindrome.",
    inputFormat: "A single string",
    outputFormat: "Yes if the string is a palindrome, otherwise No",
    sampleCases: [
      { input: "madam", output: "Yes" },
      { input: "hello", output: "No" }
    ]
  },
  {
    questionNumber: 4,
    title: "Factorial",
    description: "Compute the factorial of a given number.",
    inputFormat: "A single integer N",
    outputFormat: "Factorial of N",
    sampleCases: [
      { input: "5", output: "120" },
      { input: "0", output: "1" }
    ]
  },
  {
    questionNumber: 5,
    title: "Even or Odd",
    description: "Determine whether the given number is even or odd.",
    inputFormat: "A single integer",
    outputFormat: "Even or Odd",
    sampleCases: [
      { input: "4", output: "Even" },
      { input: "9", output: "Odd" }
    ]
  },
  {
    questionNumber: 6,
    title: "Prime Number Checker",
    description: "Check if a number is prime.",
    inputFormat: "A single integer",
    outputFormat: "Yes if prime, No otherwise",
    sampleCases: [
      { input: "7", output: "Yes" },
      { input: "10", output: "No" }
    ]
  },
  {
    questionNumber: 7,
    title: "Reverse a String",
    description: "Reverse the given string.",
    inputFormat: "A single string",
    outputFormat: "The reversed string",
    sampleCases: [
      { input: "hello", output: "olleh" },
      { input: "abc", output: "cba" }
    ]
  },
  {
    questionNumber: 8,
    title: "Count Vowels",
    description: "Count the number of vowels in a string.",
    inputFormat: "A single string",
    outputFormat: "An integer representing the number of vowels",
    sampleCases: [
      { input: "apple", output: "2" },
      { input: "why", output: "0" }
    ]
  },
  {
    questionNumber: 9,
    title: "Fibonacci Number",
    description: "Return the Nth Fibonacci number.",
    inputFormat: "A single integer N",
    outputFormat: "Nth Fibonacci number (0-indexed)",
    sampleCases: [
      { input: "0", output: "0" },
      { input: "6", output: "8" }
    ]
  },
  {
    questionNumber: 10,
    title: "Sum of Digits",
    description: "Calculate the sum of digits of the given number.",
    inputFormat: "A single integer",
    outputFormat: "Sum of its digits",
    sampleCases: [
      { input: "123", output: "6" },
      { input: "4567", output: "22" }
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
