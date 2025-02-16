import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const { users } = useSelector((state) => state.users);
  const { orders } = useSelector((state) => state.orders);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-6">
        {/* Latest Users */}
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-xl font-semibold mb-3">Latest Users</h3>
          {users.slice(0, 5).map((user) => (
            <div key={user.id} className="border-b py-2">
              <p>{user.name} - {user.email}</p>
            </div>
          ))}
          <Link to="/admin/users" className="text-blue-600 hover:underline">View All Users</Link>
        </div>

        {/* Latest Orders */}
        <div className="bg-white p-4 shadow-md rounded">
          <h3 className="text-xl font-semibold mb-3">Recent Orders</h3>
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="border-b py-2">
              <p>Order #{order.id} - ${order.total}</p>
            </div>
          ))}
          <Link to="/admin/orders" className="text-blue-600 hover:underline">View All Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
