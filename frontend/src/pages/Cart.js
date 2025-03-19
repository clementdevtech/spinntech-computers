import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../assets/css/cart.css";
const FALLBACK_IMAGE = require("../assets/images/product.png");
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  // Calculate total price dynamically
  useEffect(() => {
    setTotal(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
  }, [cartItems]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
          <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
            Continue Shopping 🛒
          </Link>
        </div>
      ) : (
        <div className="bg-white p-4 shadow-md rounded">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              {/* Product Image */}
              <img src={item.image.startsWith("http") ? item.image : FALLBACK_IMAGE} alt={item.name} className="w-20 h-20 object-cover rounded" />

              {/* Product Details */}
              <div className="flex-1 ml-4">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600">
                    ${parseFloat(item.price || 0).toFixed(2)}
                </p>

              </div>

              {/* Quantity Controls */}
              <div className="flex items-center">
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  className="px-2 py-1 bg-gray-200 rounded"
                  onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove ❌
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <p className="text-lg font-semibold mt-4">Total: ${total}</p>

          {/* Buttons: Checkout & Clear Cart */}
          <div className="flex justify-between mt-4">
            <button
              className="cart-btn text-white px-4 py-2 rounded"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart 🗑
            </button>

            <button
              className="cart-btn text-white px-4 py-2 rounded"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout 🛍
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
