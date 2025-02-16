const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.findAll();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
