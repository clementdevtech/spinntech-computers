const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

//Public Product Routes (Accessible to All Users)
router.get("/products", productController.getAllProducts);
router.get("/categories", productController.getCategories);
router.get("/:id", productController.getProductById);

//Admin Product Management (Protected)
router.post("/", verifyToken, upload.array("images", 5), isAdmin, productController.createProduct);
router.put("/:id", verifyToken, upload.array("images", 5), isAdmin, productController.updateProduct);
router.delete("/:id", verifyToken, isAdmin, productController.deleteProduct);

module.exports = router;
