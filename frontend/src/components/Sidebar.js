import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../assets/css/sidebar.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2 className="text-white fw-bold mb-4">Dashboard</h2>
      <ul className="list-unstyled">
        <li className="mb-2"><Link to="/dashboard" className="text-white text-decoration-none">Home</Link></li>
        <li className="mb-2"><Link to="/orders" className="text-white text-decoration-none">Orders</Link></li>
        <li className="mb-2"><Link to="/cart" className="text-white text-decoration-none">Cart</Link></li>
        {user?.role === "admin" && (
          <>
            <hr className="border-light my-2" />
            <h3 className="text-white fw-semibold">Admin Panel</h3>
            <li className="mb-2"><Link to="/admin/products" className="text-white text-decoration-none">Manage Products</Link></li>
            <li className="mb-2"><Link to="/admin/users" className="text-white text-decoration-none">Manage Users</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
