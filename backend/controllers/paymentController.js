const Payment = require("../models/Payment");

exports.processPayment = async (req, res) => {
    try {
        const { amount, paymentMethod, orderId } = req.body;
        const userId = req.user.id;

        const payment = await Payment.create({ userId, orderId, amount, paymentMethod });

        res.status(201).json({ message: "Payment processed successfully", payment });
    } catch (error) {
        res.status(500).json({ message: "Payment processing failed", error });
    }
};

exports.getUserPayments = async (req, res) => {
    try {
        const payments = await Payment.findByUserId(req.user.id);
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
