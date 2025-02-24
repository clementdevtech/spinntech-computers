// Updated Sidebar.js with conditional rendering based on authentication and user role
import React from "react";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, DollarSign, Bell, Users, LogOut, Shield } from "lucide-react";

const Sidebar = ({ isLoggedIn, userRole, handleLogout }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 space-y-6">
      <div className="text-center text-3xl font-bold tracking-wide">Dashboard</div>
      <nav className="space-y-4">
        <Link to="/" className="flex items-center space-x-3 hover:text-indigo-400">
          <Home size={20} />
          <span>Home</span>
        </Link>
        {isLoggedIn && (
          <>
            <Link to="/dashboard" className="flex items-center space-x-3 hover:text-indigo-400">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-3 hover:text-indigo-400">
              <User size={20} />
              <span>Profile</span>
            </Link>
            <Link to="/orders" className="flex items-center space-x-3 hover:text-indigo-400">
              <ShoppingCart size={20} />
              <span>Orders</span>
            </Link>
            <Link to="/payment" className="flex items-center space-x-3 hover:text-indigo-400">
              <DollarSign size={20} />
              <span>Payments</span>
            </Link>
            <Link to="/affiliate" className="flex items-center space-x-3 hover:text-indigo-400">
              <Users size={20} />
              <span>Affiliate</span>
            </Link>
            <Link to="/notifications" className="flex items-center space-x-3 hover:text-indigo-400">
              <Bell size={20} />
              <span>Notifications</span>
            </Link>
            {userRole === "admin" && (
              <Link to="/adminpanel" className="flex items-center space-x-3 hover:text-indigo-400">
                <Shield size={20} />
                <span>Admin Panel</span>
              </Link>
            )}
            <button onClick={handleLogout} className="flex items-center space-x-3 hover:text-red-400">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        )}
        {!isLoggedIn && (
          <Link to="/login" className="flex items-center space-x-3 hover:text-green-400">
            <User size={20} />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
