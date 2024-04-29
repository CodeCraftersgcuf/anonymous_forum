require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./utils/connectDB");


// Routers
const boardRouter = require("./routes/board.route");
const replyRouter = require("./routes/reply.route");
const threadRouter = require("./routes/thread.route");

const app = express();


// 1. Body parser
app.use(express.json({ limit: "10kb" }));

// 2. Cookie parser
app.use(cookieParser());


// Routes
app.use("/api/boards", boardRouter);
app.use("/api/reply", replyRouter);
app.use("/api/thread", threadRouter);

// Testing
app.get("/api/healthChecker", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Anonymous forum working fine",
  });
});

// unknown routes
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

// Global error handler middleware
// Global Error Handler
app.use((err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});

const port =8080;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
  // 👇 call the connectDB function here
  connectDB();
});

module.exports = app;
