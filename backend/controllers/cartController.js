const {db} = require("../db");

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, quantity } = req.body;
  
      const product = await db("products").where("id", productId).first();
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      const existingItem = await db("cart")
        .where({ user_id: userId, product_id: productId })
        .first();
  
      if (existingItem) {
        await db("cart")
          .where({ user_id: userId, product_id: productId })
          .update({ quantity: existingItem.quantity + quantity });
      } else {
        await db("cart").insert({ user_id: userId, product_id: productId, quantity });
      }
  
      res.status(201).json({ message: "Item added to cart" });
    } catch (error) {
      console.error("🔥 Error adding to cart:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  

// Get cart items for the logged-in user
exports.getCart = async (req, res) => {
    console.log("Fetching cart items"); 
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "Unauthorized: No user ID found" });
      }
  
      const userId = req.user.id;
      console.log("Fetching cart for user:", userId);
  
      const cartItems = await db("cart")
        .join("products", "cart.product_id", "products.id")
        .select(
          "cart.id",
          "cart.product_id",
          "cart.quantity",
          "products.name",
          "products.price",
          "products.image"
        )
        .where("cart.user_id", db.raw("CAST(? AS UUID)", [userId]));
  
      res.json(cartItems);
    } catch (error) {
      console.error("🔥 Error fetching cart:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

//Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (quantity < 1) return res.status(400).json({ message: "Quantity must be at least 1" });

    await db("cart")
      .where({ user_id: req.user.id, product_id: productId })
      .update({ quantity });

    res.json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    await db("cart")
      .where({ user_id: req.user.id, product_id: req.params.productId })
      .del();

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Error removing item:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
