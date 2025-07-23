const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoDBURL);
    console.log('MongoDB connected');
  } catch (err) {
    console.log("Not connected with DB")
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;