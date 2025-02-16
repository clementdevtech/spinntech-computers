const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// Payment webhook handling
router.post('/payment', webhookController.handlePaymentWebhook);

module.exports = router;
