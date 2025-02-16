import { useState } from "react";

const Payment = () => {
  const [method, setMethod] = useState("");

  const handlePayment = () => {
    alert(`Processing payment via ${method}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Choose Payment Method</h2>
      <div className="bg-white p-4 shadow-md rounded">
        <label className="block mb-2">Select a Payment Method:</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="p-2 border w-full rounded">
          <option value="">Select</option>
          <option value="paypal">PayPal</option>
          <option value="mpesa">M-PESA</option>
          <option value="bank">Bank Transfer</option>
        </select>
        <button 
          onClick={handlePayment} 
          disabled={!method} 
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Payment;
