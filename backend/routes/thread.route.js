const express = require("express");
const {
  getAllThreadsContoller,
  createThreadController,
  getBoardThreadsController,
  getThreadController,
} = require("../controllers/thread.controller");

const router = express.Router();

router.get("/threads", getAllThreadsContoller);
router.get("/thread", getThreadController);
router.get("/threads/board", getBoardThreadsController);
router.post("/create", createThreadController);
module.exports = router;
