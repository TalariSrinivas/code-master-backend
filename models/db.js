const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://srinivas:srinivas123@cluster0.b0wzvpn.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,  // <- Corrected this line
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
