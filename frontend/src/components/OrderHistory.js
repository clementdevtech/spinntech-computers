import { useSelector } from "react-redux";

const OrderHistory = () => {
  const orders = useSelector((state) => state.orders.list);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="border p-4 mb-2 rounded bg-white shadow">
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total:</strong> ${order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
