import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/Navbar.css";
import "../assets/css/sidebar.css";
import { logoutUser } from "../redux/authSlice";
import NotificationBell from "./NotificationBell";
import Sidebar from "./Sidebar";
import { BsList } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
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

    const handleOutsideClick = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.classList.contains("toggle-sidebar-btn")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);
    setFilteredItems(
      query ? categories.filter((item) => item.toLowerCase().includes(query)) : []
    );
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="navbar-container d-flex flex-column w-100">
      <nav className="navbar-upper d-flex justify-content-between align-items-center w-100 py-2 flex-wrap">
        <div className="d-flex align-items-center">
          
          <Link className="navbar-brand text-white fw-bold fs-4" to="/">
            CompanyName
          </Link>
        </div>
        <div className="d-flex align-items-center ms-auto flex-wrap">
          <NotificationBell />
          {user ? (
            <div className="dropdown ms-3">
              <button
                className="btn btn-light dropdown-toggle"
                id="userDropdown"
                data-bs-toggle="dropdown"
              >
                {user.name}
              </button>
              <ul className="dropdown-menu w-100">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => dispatch(logoutUser())}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-outline-light ms-3" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>

      <nav className="navbar-lower d-flex justify-content-between align-items-center w-100 py-2 flex-column flex-md-row">
        <div className="search-container position-relative w-50 w-md-50 me-md-3 mb-2 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search for products..."
            value={search}
            onChange={handleSearch}
          />
          {filteredItems.length > 0 && (
            <ul className="list-group position-absolute w-100 shadow-sm mt-1">
              {filteredItems.map((item, index) => (
                <li key={index} className="list-group-item">
                  <Link
                    to={`/category/${item}`}
                    className="text-decoration-none text-dark"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="dropdown category-dropdown">
          <button
            className="btn btn-outline-light dropdown-toggle"
            type="button"
            id="categoryDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Categories
          </button>
          <ul className="dropdown-menu w-100" aria-labelledby="categoryDropdown">
            {categories.map((category, index) => (
              <li key={index}>
                <Link
                  className="dropdown-item"
                  to={`/category/${category}`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          
        </div>
        <button
            className="btn toggle-sidebar-btn me-3"
            onClick={toggleSidebar}
            style={{ backgroundColor: "#1e88e5", color: "white" }}
          >
            <BsList size={28} />
          </button>
      </nav>

      {/* Sidebar with overlay behavior */}
      <div
        ref={sidebarRef}
        className={`sidebar ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
      >
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && (
        <div
          className="overlay"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Navbar;