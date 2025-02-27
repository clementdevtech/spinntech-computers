const { db } = require("../db");
const multer = require("multer");
const fs = require("fs");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../frontend/src/assets/products/");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
    }
  },
});


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
    if (!req.files || req.files.length < 1) {
      return res.status(400).json({ message: "At least one image is required." });
    }
    
    const { name, description, price, category } = req.body;
    const imagePaths = req.files.map((file) => `/assets/products/${file.filename}`);

    const [newProduct] = await db("products").insert(
      { name, description, price, category, image: JSON.stringify(imagePaths) },
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
    const { name, description, price, category } = req.body;
    const product = await db("products").where({ id: req.params.id }).first();

    if (!product) return res.status(404).json({ message: "Product not found" });

    let imagePaths = JSON.parse(product.image);
    
    // If new images are uploaded, delete old ones and update
    if (req.files && req.files.length > 0) {
      imagePaths.forEach((imgPath) => {
        const filePath = path.join(__dirname, "..", imgPath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
      imagePaths = req.files.map((file) => `/uploads/products/${file.filename}`);
    }

    const [updatedProduct] = await db("products")
      .where({ id: req.params.id })
      .update({ name, description, price, category, image: JSON.stringify(imagePaths) }, ["*"]);

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};


// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await db("products").where({ id: req.params.id }).first();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Delete images from frontend folder
    const imagePaths = JSON.parse(product.image);
    imagePaths.forEach((imgPath) => {
      const filePath = path.join(__dirname, "../..", "frontend", imgPath);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    // Delete product from database
    await db("products").where({ id: req.params.id }).del();
    
    res.json({ message: "Product and images deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};


module.exports = { getAllProducts, getProductById, getCategories, createProduct, updateProduct, deleteProduct };
