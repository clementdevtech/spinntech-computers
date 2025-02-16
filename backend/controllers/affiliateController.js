const Affiliate = require("../models/Affiliate");

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
