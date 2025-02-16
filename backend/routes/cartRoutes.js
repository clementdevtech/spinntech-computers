const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Cart routes
router.post('/add', verifyToken, cartController.addToCart);
router.get('/', verifyToken, cartController.getCart);
router.put('/update', verifyToken, cartController.updateCartItem);
router.delete('/remove/:itemId', verifyToken, cartController.removeCartItem);

module.exports = router;
