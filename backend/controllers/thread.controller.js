const Board = require("../models/Board.model");
const {
  getAllThreads,
  createThread,
  getBoardThread,
  getThread,
} = require("../services/thread.service");

module.exports.getAllThreadsContoller = async (req, res, next) => {
  try {
    const threads = await getAllThreads();
    res.status(200).json({
      message: "All threads fetched",
      data: threads,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.createThreadController = async (req, res, next) => {
  try {
    const { boardName, subject, user, content } = req.body;
    let tagsArray = req.body?.tags || [];
    if (tagsArray.length > 0) {
      tagsArray = tagsArray.map((e) => {
        return { title: e };
      });
    }
    const userIP = req.ip;
    console.log(userIP);
    const board = await Board.findOne({ name: boardName });
    if (board) {
      board.threadCount = (board?.threadCount || 0) + 1;
      board.save();
    }
    console.log(board);
    const boardId = board._id;
    console.log(boardId);
    const thread = await createThread({
      boardId,
      subject,
      user,
      userIP,
      tags: tagsArray,
      content,
    });

    res.status(201).json({
      message: "Thread created successfully",
      data: thread,
    });
  } catch (error) {
    console.log(error);
    console.log(error);
    next(error);
  }
};

module.exports.getBoardThreadsController = async (req, res, next) => {
  try {
    const { boardId } = req.query;
    const threads = await getBoardThread(boardId);
    res.status(200).json({
      message: `Threads fetched for board: ${boardId}`,
      data: threads,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getThreadController = async (req, res, next) => {
  try {
    const { threadNumber } = req.query;
    const thread = await getThread(threadNumber);
    res.status(200).json({
      message: `Thread number ${threadNumber} fetched.`,
      data: thread,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
