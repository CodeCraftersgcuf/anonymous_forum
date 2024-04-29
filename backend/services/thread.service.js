const Board = require("../models/Board.model");
const Thread = require("../models/Thread.model");
const AppError = require("../utils/appError");

const getAllThreads = async () => {
  try {
    const threads = await Thread.find().exec();
    return threads;
  } catch (error) {
    throw new AppError("Failed to retrieve threads", 500);
  }
};

const createThread = async (payload) => {
  try {
    const thread = await Thread.create(payload);
    return thread;
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to create thread", 400);
  }
};

const getBoardThread = async (boardNumber) => {
  try {
    const board = await Board.findOne({ boardNumber: boardNumber });
    const boardId = board._id;
    const threads = await Thread.find({ boardId: boardId });
    return threads;
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to fetch threads for the board");
  }
};

const getThread = async (threadNumber) => {
  try {
    const thread = await Thread.findOne({ threadNumber: threadNumber });
    return thread;
  } catch (error) {
    console.log(error);
    throw new AppError("Failed to fetch the thread");
  }
};

module.exports = { getAllThreads, createThread, getBoardThread, getThread };
