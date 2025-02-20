const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const { verifyToken } = require('../middlewares/authMiddleware');

// User chat routes
router.post('/send', verifyToken, chatController.sendMessage);
router.get('/history', verifyToken, chatController.getMessages);

module.exports = router;
