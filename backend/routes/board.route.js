const express = require("express");
const {
  createBoardHandler,
  getAllBoardHandler,
  getBoardHandler,
} = require("../controllers/board.controller");
const router = express.Router();

router.get("/", getAllBoardHandler);
router.get("/board", getBoardHandler);
router.post("/create", createBoardHandler);

module.exports = router;
