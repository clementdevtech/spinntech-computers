const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Order routes
router.post('/create', verifyToken, orderController.createOrder);
router.get('/history', verifyToken, orderController.getUserOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.put('/:id/cancel', verifyToken, orderController.cancelOrder);

module.exports = router;
