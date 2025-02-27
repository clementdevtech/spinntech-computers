import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";
import { Home, User, ShoppingCart, DollarSign, Bell, Users, LogOut, Shield, Heart, HelpCircle, Settings, Headphones, X } from "lucide-react";
import "../assets/css/sidebar.css";

const Sidebar = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = user?.token;

  useEffect(() => {
    if (token) {

    }
  }, [token]);

  return (
    <aside className="bg-dark text-white vh-100 p-4">
      {/* Sidebar Header with Close Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0">Dashboard</h5>
        <button className="btn btn-sm text-white" onClick={closeSidebar}>
          <X size={24} />
        </button>
      </div>

       {/* Scrollable Content */}
    <div className="sidebar-content flex-grow-1 overflow-auto p-3">
      <nav className="d-flex flex-column">
        {/* General Links */}
        <Link to="/" className="sidebar-link" onClick={closeSidebar}>
          <Home size={20} />
          <span>Home</span>
        </Link>

        <Link to="/support" className="sidebar-link" onClick={closeSidebar}>
          <Headphones size={20} />
          <span>Customer Support</span>
        </Link>

        <Link to="/help" className="sidebar-link" onClick={closeSidebar}>
          <HelpCircle size={20} />
          <span>Help & FAQs</span>
        </Link>

        <Link to="/settings" className="sidebar-link" onClick={closeSidebar}>
          <Settings size={20} />
          <span>Settings</span>
        </Link>

        {/* Logged-In User Links */}
        {user ? (
          <>
            <Link to="/dashboard" className="sidebar-link" onClick={closeSidebar}>
              <User size={20} />
              <span>Dashboard</span>
            </Link>

            <Link to="/profile" className="sidebar-link" onClick={closeSidebar}>
              <User size={20} />
              <span>Profile</span>
            </Link>

            <Link to="/orders" className="sidebar-link" onClick={closeSidebar}>
              <ShoppingCart size={20} />
              <span>Orders</span>
            </Link>

            <Link to="/wishlist" className="sidebar-link" onClick={closeSidebar}>
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>

            <Link to="/payment" className="sidebar-link" onClick={closeSidebar}>
              <DollarSign size={20} />
              <span>Payments</span>
            </Link>

            <Link to="/affiliate" className="sidebar-link" onClick={closeSidebar}>
              <Users size={20} />
              <span>Affiliate</span>
            </Link>

            <Link to="/notifications" className="sidebar-link" onClick={closeSidebar}>
              <Bell size={20} />
              <span>Notifications</span>
            </Link>

            {/* Admin-Only Links */}
            {user.role === "admin" && (
              <>
                <div className="text-secondary text-uppercase small mt-4 mb-2">Admin Panel</div>

                <Link to="/admin" className="sidebar-link" onClick={closeSidebar}>
                  <Shield size={20} />
                  <span>Admin Panel</span>
                </Link>
              </>
            )}

            {/* Logout Button */}
            <button
              onClick={() => {
                dispatch(logoutUser());
                closeSidebar();
              }}
              className="sidebar-link btn text-danger"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          /* Login for Guests */
          <Link to="/login" className="sidebar-link text-success" onClick={closeSidebar}>
            <User size={20} />
            <span>Login</span>
          </Link>
        )}
      </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
