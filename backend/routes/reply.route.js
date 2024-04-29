const express = require("express");
const {
  getAllRepliesHandler,
  createReplyHandler,
  getThreadRepliesHandler,
  getAllChildRepliesHandler,
} = require("../controllers/reply.controller");

const router = express.Router();

router.get("/replies", getAllRepliesHandler);
router.get("/childReplies", getAllChildRepliesHandler);
router.get("/thread", getThreadRepliesHandler);
router.post("/create", createReplyHandler);

module.exports = router;
