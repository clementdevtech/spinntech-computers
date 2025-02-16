import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // TODO: Fetch categories from backend
    setCategories(["Laptops", "Desktops", "Accessories", "Gaming", "Networking"]);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    // TODO: Implement search functionality
  };

  return (
    <nav className="bg-blue-700 p-4 text-white flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">Computer Store</Link>

      {/* Search Bar */}
      <div className="relative w-1/3">
        <input
          type="text"
          className="w-full p-2 rounded text-black"
          placeholder="Search for products..."
          value={search}
          onChange={handleSearch}
        />
        <button className="absolute right-2 top-2 text-gray-600">
          🔍
        </button>
      </div>

      {/* Categories Dropdown */}
      <div className="relative">
        <button className="bg-white text-black px-3 py-1 rounded">Categories</button>
        <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded hidden group-hover:block">
          {categories.map((category, index) => (
            <Link key={index} to={`/category/${category}`} className="block px-4 py-2 hover:bg-gray-200">
              {category}
            </Link>
          ))}
        </div>
      </div>

      {/* User Section */}
      <div className="flex items-center gap-4">
        <NotificationBell />
        {user ? (
          <div className="relative">
            <button className="hover:underline">{user.name}</button>
            <div className="absolute mt-2 bg-white text-black shadow-md rounded hidden group-hover:block">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
              <button onClick={() => dispatch(logout())} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link to="/login" className="hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
