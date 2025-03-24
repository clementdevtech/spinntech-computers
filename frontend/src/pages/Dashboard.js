import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Welcome, {user?.username}!</h2>
      <p className="text-gray-600">Manage your account, orders, and payments.</p>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <Link to="/orders" className="bg-blue-500 text-white p-4 rounded text-center">
          My Orders
        </Link>
        <Link to="/payments" className="bg-green-500 text-white p-4 rounded text-center">
          Payment History
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
