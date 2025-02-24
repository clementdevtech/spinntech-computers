const { db } = require("../db");

// Get all products with pagination & search
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    const products = await db("products")
      .where("name", "ILIKE", `%${search}%`)
      .limit(limit)
      .offset(offset);

    const total = await db("products").count("* as count");
    
    res.json({ products, total: total[0].count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await db("products").where({ id: req.params.id }).first();
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await db("products").select("category").distinct();
    const categories = result.map((row) => row.category);
    res.json(categories.length ? categories : []);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const [newProduct] = await db("products").insert(
      { name, description, price, category, image },
      ["*"]
    );

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const [updatedProduct] = await db("products")
      .where({ id: req.params.id })
      .update({ name, description, price, category, image }, ["*"]);

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await db("products").where({ id: req.params.id }).del();
    if (!deleted) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

module.exports = { getAllProducts, getProductById, getCategories, createProduct, updateProduct, deleteProduct };
