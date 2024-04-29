const Board = require("../models/Board.model");

const createBoard = async (input) => {
  try {
    return Board.create(input);
  } catch (error) {
    throw error;
  }
};

const getAllBoards = async () => {
  return await Board.find();
};

const getBoard = async (boardNumber) => {
  return await Board.findOne({ boardNumber: boardNumber });
};
module.exports = { createBoard, getAllBoards, getBoard };
