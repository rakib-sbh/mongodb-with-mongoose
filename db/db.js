const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error connecting");
    process.exit(1);
  }
};

module.exports = connectDB;
