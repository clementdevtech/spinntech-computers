const express = require("express");
const { sendMessage, adminReply, getUnansweredQueries, getAllMessages } = require("../controllers/chatController");

const router = express.Router();

router.post("/", sendMessage);
router.post("/admin-reply", adminReply);
router.get("/unanswered-queries", getUnansweredQueries);
router.get("/", getAllMessages);

module.exports = router;
