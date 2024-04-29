const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const { replySchema } = require("./Reply.model");

const threadSchema = new mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    default: "",
  },
  tags: [
    {
      title: String,
    },
  ],
  userIP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  threadNumber: {
    type: String,
    unique: true,
  },
  replyCount: {
    type: Number,
    default: 0,
  },
});

// Pre-save middleware to generate threadNumber based on counter and random component
threadSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const count = await Thread.countDocuments();
    const randomComponent = uuidv4(); // Generate a random UUID using uuid
    this.threadNumber = `T${count}-${randomComponent}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Thread = mongoose.model("Thread", threadSchema);

module.exports = Thread;
