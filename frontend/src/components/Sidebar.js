import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <Link to="/dashboard" className="hover:underline">Home</Link>
        </li>
        <li className="mb-2">
          <Link to="/orders" className="hover:underline">Orders</Link>
        </li>
        <li className="mb-2">
          <Link to="/cart" className="hover:underline">Cart</Link>
        </li>
        {user?.role === "admin" && (
          <>
            <hr className="border-gray-600 my-2" />
            <h3 className="text-lg font-semibold">Admin Panel</h3>
            <li className="mb-2">
              <Link to="/admin/products" className="hover:underline">Manage Products</Link>
            </li>
            <li className="mb-2">
              <Link to="/admin/users" className="hover:underline">Manage Users</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
