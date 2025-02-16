const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Payment routes
router.post('/pay', verifyToken, paymentController.processPayment);
router.get('/status/:orderId', verifyToken, paymentController.getPaymentStatus);

module.exports = router;
