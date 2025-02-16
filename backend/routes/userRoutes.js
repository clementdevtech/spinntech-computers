const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');

// User profile & management
router.get('/profile', verifyToken, userController.getUserProfile);
router.put('/profile/update', verifyToken, userController.updateUserProfile);
router.get('/referrals', verifyToken, userController.getUserReferrals);

module.exports = router;
