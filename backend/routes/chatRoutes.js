const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.post("/airesponse", chatController.airesponse);
router.post("/sendMessage", chatController.sendMessage);
router.post("/adminReply", chatController.adminReply);
router.get("/unansweredQueries", chatController.getUnansweredQueries);
router.get("/allMessages", chatController.getAllMessages);

module.exports = router;