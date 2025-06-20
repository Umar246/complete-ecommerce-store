const mongoose = require("mongoose");

const mongoDB_URL = process.env.REACT_APP_MONGODB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoDB_URL);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("Something went wrong, DB connection failed: ", err);
    process.exit(0);
  }
};

module.exports = connectDB;
