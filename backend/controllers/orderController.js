const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const { products, totalAmount, shippingAddress } = req.body;
        const userId = req.user.id;

        const newOrder = await Order.create({ userId, products, totalAmount, shippingAddress });

        res.status(201).json({ message: "Order placed successfully", newOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.findByUserId(req.user.id);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.update(req.params.id, { status });

        res.json({ message: "Order status updated", updatedOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.cancelOrder = async (req, res) => {
    try {
        await Order.delete(req.params.id);
        res.json({ message: "Order canceled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
