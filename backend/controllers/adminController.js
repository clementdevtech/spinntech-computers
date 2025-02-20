const User = require("../models/User");
const Order = require("../models/Order");
const Payment = require("../models/Payment");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getTransactions = async (req, res) => {
    try {
        const orders = await Order.findAll();
        const payments = await Payment.findAll();
        res.json({ orders, payments });
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

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the admin exists
        const admin = await User.findOne({ where: { email, role: "admin" } });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: admin.id, role: admin.role }, SECRET_KEY, { expiresIn: "7d" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the admin already exists
        const existingAdmin = await User.findOne({ where: { email } });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new admin
        const newAdmin = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "admin", // Ensure role is set to admin
        });

        res.status(201).json({ message: "Admin created successfully", admin: newAdmin });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getAdminDashboard = async (req, res) => {
    try {
        res.json({ message: "Welcome to the admin dashboard" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
