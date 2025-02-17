import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import NotificationBell from "./NotificationBell";

import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend (replace with API call if needed)
    setCategories([
      "Laptops",
      "Desktops",
      "Accessories",
      "Gaming",
      "Networking",
      "Monitors",
      "Keyboards",
      "Mouse",
      "Graphics Cards",
      "Headphones",
    ]);
  }, []);

  // Advanced Search Functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    if (query.length > 0) {
      const results = categories.filter((item) =>
        item.toLowerCase().includes(query)
      );
      setFilteredItems(results);
    } else {
      setFilteredItems([]);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand fw-bold" to="/">Computer Store</Link>

      {/* Toggle Button for Mobile */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Content */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          {/* Categories Dropdown */}
          <li className="nav-item dropdown">
            <button className="btn btn-light dropdown-toggle" id="categoryDropdown" data-bs-toggle="dropdown">
              Categories
            </button>
            <ul className="dropdown-menu">
              {categories.map((category, index) => (
                <li key={index}>
                  <Link className="dropdown-item" to={`/category/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        {/* Search Bar */}
        <div className="position-relative">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Search for products..."
            value={search}
            onChange={handleSearch}
          />
          {/* Search Suggestions */}
          {filteredItems.length > 0 && (
            <ul className="list-group position-absolute w-100 shadow-sm mt-1">
              {filteredItems.map((item, index) => (
                <li key={index} className="list-group-item">
                  <Link to={`/category/${item}`} className="text-decoration-none text-dark">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notification and User Section */}
        <div className="d-flex align-items-center">
          <NotificationBell />

          {user ? (
            <div className="dropdown ms-3">
              <button className="btn btn-light dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown">
                {user.name}
              </button>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li>
                  <button className="dropdown-item" onClick={() => dispatch(logoutUser())}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-outline-light ms-3" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
