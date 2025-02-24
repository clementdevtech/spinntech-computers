import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  const { orderId } = useParams();
  const order = useSelector((state) => state.orders.find((o) => o.id === orderId));

  if (!order) {
    return <p className="text-center text-red-500">Order not found</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Order Details</h2>
      <div className="bg-white p-4 shadow-md rounded">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total Amount:</strong> ${order.total}</p>
        <h3 className="text-xl font-semibold mt-4">Items:</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.id} className="border-b py-2">{item.name} - ${item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetails;
