const {
  createBoard,
  getAllBoards,
  getBoard,
} = require("../services/board.service");

module.exports.createBoardHandler = async (req, res, next) => {
  try {
    let tagsArray = req.body?.tags || [];
    if (tagsArray.length > 0) {
      tagsArray = tagsArray.map((e, i) => {
        return { id: i, title: e };
      });
    }
    const board = await createBoard({
      name: req.body.name,
      description: req.body.description,
      tags: tagsArray,
    });
    board.save();
    res.status(201).json({
      message: "Board created",
      data: board,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getAllBoardHandler = async (req, res, next) => {
  try {
    const boards = await getAllBoards();
    res.status(200).json({ message: "All boards fetched", data: boards });
  } catch (error) {
    next(error);
  }
};

module.exports.getBoardHandler = async (req, res, next) => {
  try {
    const { boardNumber } = req.query;
    const board = await getBoard(boardNumber);
    res.status(200).json({
      message: `Fetched the Board number ${boardNumber}`,
      data: board,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
