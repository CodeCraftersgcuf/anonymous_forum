require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");
const app = express();

const allowedOrigin = "http://localhost:3000"; // Replace with your frontend URL
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);

// Routers
const boardRouter = require("./routes/board.route");
const replyRouter = require("./routes/reply.route");
const threadRouter = require("./routes/thread.route");


// 1. Body parser
app.use(express.json({ limit: "10000kb" }));

// 2. Cookie parser
app.use(cookieParser());

// Routes
app.use("/api/boards", boardRouter);
app.use("/api/reply", replyRouter);
app.use("/api/thread", threadRouter);

// unknown routes
app.all("*", (req, res, next) => {
  //const err = new Error(`Route ${req.originalUrl} not found`);
 // err.statusCode = 404;
  //next(err);
  res.send("Not Found! 🤨😶😶‍🌫️🙄😏😣😥😮😴");
  next();
});

const port =8080;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});

module.exports = app;
