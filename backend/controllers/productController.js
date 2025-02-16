const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const newProduct = await Product.create({ name, description, price, stock });

        res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.update(req.params.id, req.body);
        res.json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.delete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
