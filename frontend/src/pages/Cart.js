import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchCart, removeFromCart, updateCartQuantity } from "../services/cartService";
import "../assets/css/cart.css";

const FALLBACK_IMAGE = "/products/product.png";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  //Fetch Cart Items from Backend
  useEffect(() => {
    const loadCart = async () => {
      const cartData = await fetchCart();
      setCartItems(cartData);
    };
    loadCart();
  }, []);

  // Calculate Total Price
  useEffect(() => {
    setTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  }, [cartItems]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/">Continue Shopping 🛒</Link>
        </div>
      ) : (
        <div className="cart-items-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              {/* Clickable Product Image */}
              <img src={item.image || FALLBACK_IMAGE} alt={item.name} onClick={() => navigate(`/product/${item.product_id}`)} />

              {/* Clickable Product Name */}
              <div className="cart-item-details">
                <p className="cart-item-name" onClick={() => navigate(`/product/${item.product_id}`)}>{item.name}</p>
                <p className="cart-item-price">${parseFloat(item.price || 0).toFixed(2)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="cart-quantity">
                <button onClick={() => updateCartQuantity(item.product_id, Math.max(1, item.quantity - 1))}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateCartQuantity(item.product_id, item.quantity + 1)}>+</button>
              </div>

              {/* Remove Button */}
              <button className="remove-btn" onClick={() => removeFromCart(item.product_id)}>❌ Remove</button>
            </div>
          ))}
          <p className="cart-summary">Total: ${total}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
