const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// User chat routes
router.post('/send', verifyToken, chatController.sendMessage);

// Get chat history
router.get('/history', verifyToken, chatController.getMessages);

// Store user queries
router.post("/store-query", verifyToken, chatController.storeUserQuery);

// Fetch similar queries for quick replies
router.get("/suggested-replies", verifyToken, chatController.getSuggestedReplies);

// Admin responds to user query
router.post("/admin-reply", verifyToken, isAdmin, chatController.adminReply);

module.exports = router;
