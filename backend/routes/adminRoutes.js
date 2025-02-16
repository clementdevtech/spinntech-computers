const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Admin authentication & management
router.post('/login', adminController.loginAdmin);
router.post('/create', verifyToken, isAdmin, adminController.createAdmin);
router.get('/dashboard', verifyToken, isAdmin, adminController.getAdminDashboard);

// User & transaction management
router.get('/users', verifyToken, isAdmin, adminController.getAllUsers);
router.get('/transactions', verifyToken, isAdmin, adminController.getTransactions);

// Chat management
router.get('/chats', verifyToken, isAdmin, adminController.getUnansweredChats);
router.post('/chats/reply', verifyToken, isAdmin, adminController.replyToChat);

// Product management
router.post('/products', verifyToken, isAdmin, adminController.createProduct);
router.put('/products/:id', verifyToken, isAdmin, adminController.updateProduct);
router.delete('/products/:id', verifyToken, isAdmin, adminController.deleteProduct);

module.exports = router;
