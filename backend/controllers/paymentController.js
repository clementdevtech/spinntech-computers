const Payment = require("../models/Payment");

exports.processPayment = async (req, res) => {
    try {
        const { amount, paymentMethod, orderId } = req.body;
        const userId = req.user.id;

        // Ensure orderId is unique
        const existingPayment = await Payment.findByOrderId(orderId);
        if (existingPayment) {
            return res.status(400).json({ message: "Order already has a payment" });
        }

        // Process payment
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

exports.getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const payment = await Payment.findByOrderId(orderId);

        if (!payment) {
            return res.status(404).json({ message: "Payment not found" });
        }

        res.json({ orderId, status: payment.status });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
