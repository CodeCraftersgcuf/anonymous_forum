const mongoose = require("mongoose");

// mongodb+srv://<username>:<password>@cluster0.ssslp.mongodb.net/?retryWrites=true&w=majority

const dbUrl = "mongodb://127.0.0.1:27017/test2";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Database connected...");
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
//connectDB();
module.exports = connectDB;
