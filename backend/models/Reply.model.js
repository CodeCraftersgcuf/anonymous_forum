const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const replySchema = new mongoose.Schema({
  threadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Thread",
    required: true,
  },
  parentReplyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reply",
    default: null,
  },
  text: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  replyNumber: {
    type: String,
    unique: true,
  },
  userIP: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to generate replyNumber based on counter and random component
replySchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const count = await Reply.countDocuments();
    const randomComponent = uuidv4(); // Generate a random UUID using uuid
    this.replyNumber = `R${count}-${randomComponent}`;
    next();
  } catch (error) {
    next(error);
  }
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = { Reply, replySchema };

