import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({ users: 0, sales: 0, orders: 0 });

  useEffect(() => {
    // Simulating fetching stats
    setTimeout(() => {
      setStats({ users: 120, sales: 5000, orders: 200 });
    }, 1000);
  }, []);

  if (!user || user.role !== "admin") {
    return <p className="text-center text-red-500">Access Denied!</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded">
          <h3 className="text-lg">Users</h3>
          <p className="text-2xl">{stats.users}</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded">
          <h3 className="text-lg">Total Sales</h3>
          <p className="text-2xl">${stats.sales}</p>
        </div>
        <div className="bg-yellow-500 text-white p-4 rounded">
          <h3 className="text-lg">Orders</h3>
          <p className="text-2xl">{stats.orders}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Quick Actions</h3>
        <ul>
          <li><Link to="/admin/products" className="text-blue-600 hover:underline">Manage Products</Link></li>
          <li><Link to="/admin/orders" className="text-blue-600 hover:underline">View Orders</Link></li>
          <li><Link to="/admin/users" className="text-blue-600 hover:underline">Manage Users</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
