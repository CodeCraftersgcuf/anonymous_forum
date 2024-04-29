const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const boardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  boardNumber: {
    type: String,
    unique: true,
  },
  threadCount: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      id: Number,
      title: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to generate replyNumber based on counter and random component
boardSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const count = await Board.countDocuments();
    const randomComponent = uuidv4(); // Generate a random UUID using uuid
    this.boardNumber = `R${count}-${randomComponent}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
