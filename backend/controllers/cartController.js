const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        const updatedCart = await Cart.addItem(userId, productId, quantity);

        res.status(201).json({ message: "Item added to cart", updatedCart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.getByUserId(req.user.id);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        await Cart.removeItem(req.user.id, req.params.productId);
        res.json({ message: "Item removed from cart" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
