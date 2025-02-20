const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }
        const existingUser = await User.findByEmail(email);
        if (existingUser && existingUser.id !== req.user.id) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const updatedUser = await User.update(req.user.id, { name, email });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await User.delete(req.user.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getUserReferrals = async (req, res) => {
    try {
        const referrals = await User.getReferrals(req.user.id);
        res.json({ message: "Referrals fetched successfully", referrals });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
