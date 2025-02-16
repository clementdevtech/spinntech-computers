const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.update(req.user.id, { name, email });

        res.json({ message: "Profile updated successfully", updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.delete(req.user.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
