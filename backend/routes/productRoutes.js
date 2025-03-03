const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

// Public Product Routes (Accessible to All Users)
router.get("/", productController.getAllProducts);
router.get("/categories", productController.getCategories);
router.get("/:id", productController.getProductById);

// Admin Product Management (Protected Routes)
router.post("/createproduct", verifyToken, isAdmin, upload.array("images", 5), productController.createProduct);
router.put("/updateproduct/:id", verifyToken, isAdmin, upload.array("images", 5), productController.updateProduct);
router.delete("/delete/:id", verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
