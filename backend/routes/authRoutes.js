const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// User authentication
router.post('/register', authController.register);
router.get("/verify-email", authController.verifyEmail);
router.post('/login', authController.login);
router.post("/resend-verification", authController.resendVerificationEmail);
router.post('/logout', authController.logoutUser);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
