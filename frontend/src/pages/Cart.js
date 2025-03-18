import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white p-4 shadow-md rounded">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-2">
              <img src={item.image} alt={item.name} className="w-16 h-16" />
              <p>{item.name} - ${item.price}</p>
              <div>
                <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: -1 }))}>-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => dispatch(updateQuantity({ id: item.id, amount: 1 }))}>+</button>
                <button onClick={() => dispatch(removeFromCart(item.id))} className="ml-4 text-red-500">Remove</button>
              </div>
            </div>
          ))}
          <p className="text-lg font-semibold mt-4">Total: ${total}</p>
          <Link to="/checkout" className="mt-2 bg-blue-500 text-white px-4 py-2 rounded block text-center">Proceed to Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;