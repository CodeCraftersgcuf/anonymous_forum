const mongoose = require("mongoose");
require("dotenv");
//const dbUrl = "mongodb://127.0.0.1:27017/anonymous";
const dbUrl =process.env.URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 2000);
  }
};
//connectDB();
module.exports = connectDB;
