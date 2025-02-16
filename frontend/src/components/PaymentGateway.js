const Payment = () => {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold">Payment</h2>
        <p className="mt-4">Choose your preferred payment method:</p>
        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Pay with PayPal
        </button>
        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">
          Pay with Card
        </button>
      </div>
    );
  };
  
  export default Payment;
  