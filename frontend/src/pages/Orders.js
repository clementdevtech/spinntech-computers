import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const { orders } = useSelector((state) => state.orders);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="bg-white p-4 shadow-md rounded">
          {orders.map((order) => (
            <div key={order.id} className="border-b p-3">
              <p>Order ID: <span className="font-semibold">{order.id}</span></p>
              <p>Status: 
                <span className={`ml-2 px-2 py-1 text-white rounded ${order.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                  {order.status}
                </span>
              </p>
              <Link to={`/order/${order.id}`} className="text-blue-600 hover:underline">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
