const Affiliate = require("../models/Affiliate");
const WithdrawalRequest = require("../models/WithdrawalRequest");

exports.createAffiliate = async (req, res) => {
    try {
        const userId = req.user.id;
        const { referralCode } = req.body;

        const newAffiliate = await Affiliate.create({ userId, referralCode });

        res.status(201).json({ message: "Affiliate program joined successfully", newAffiliate });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getReferrals = async (req, res) => {
    try {
        const referrals = await Affiliate.findReferrals(req.user.id);
        res.json(referrals);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getEarnings = async (req, res) => {
    try {
        const earnings = await Affiliate.calculateEarnings(req.user.id);
        res.json({ earnings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


exports.withdrawEarnings = async (req, res) => {
    try {
        const userId = req.user.id;
        const { amount } = req.body;

        // Validate amount
        if (!amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid withdrawal amount" });
        }

        // Fetch user's current earnings
        const earnings = await Affiliate.calculateEarnings(userId);

        if (earnings < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Deduct the amount from earnings (assuming you store balance in the database)
        await Affiliate.deductEarnings(userId, amount);

        // Create a withdrawal request
        const withdrawal = await WithdrawalRequest.create({
            user_id: userId,
            amount,
            status: "pending",
        });

        res.status(201).json({
            message: "Withdrawal request submitted successfully",
            withdrawal,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
