const express = require('express');
const router = express.Router();
const affiliateController = require('../controllers/affiliateController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Affiliate routes
router.get('/referrals', verifyToken, affiliateController.getUserReferrals);
router.get('/earnings', verifyToken, affiliateController.getAffiliateEarnings);
router.post('/withdraw', verifyToken, affiliateController.withdrawEarnings);

module.exports = router;
