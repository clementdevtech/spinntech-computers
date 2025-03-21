import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { total, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("Payment successful!");
    dispatch(clearCart());
    navigate("/orderhistory");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Checkout</h2>
      <div className="bg-white p-4 shadow-md rounded">
        <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
        {cartItems.map((item) => (
          <p key={item.id} className="border-b py-2">{item.name} - ${item.price}</p>
        ))}
        <p className="text-lg font-semibold mt-4">Total: ${total}</p>
        <button onClick={handleCheckout} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">Complete Payment</button>
      </div>
    </div>
  );
};

export default Checkout;
