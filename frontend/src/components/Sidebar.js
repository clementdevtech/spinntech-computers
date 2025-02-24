import React from "react";
import { Link } from "react-router-dom";
import { Home, User, ShoppingCart, DollarSign, Bell, Users, LogOut, Shield, Heart, HelpCircle, Settings, Package, Headphones } from "lucide-react";

const Sidebar = ({ isLoggedIn, userRole, handleLogout }) => {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 space-y-6">
      <div className="text-center text-3xl font-bold tracking-wide">Dashboard</div>
      <nav className="space-y-4">
        
        {/* Home & General Links */}
        <Link to="/" className="flex items-center space-x-3 hover:text-indigo-400">
          <Home size={20} />
          <span>Home</span>
        </Link>
         {/* New Sections: Customer Support & Help */}
         <Link to="/support" className="flex items-center space-x-3 hover:text-indigo-400">
              <Headphones size={20} />
              <span>Customer Support</span>
            </Link>
            <Link to="/help" className="flex items-center space-x-3 hover:text-indigo-400">
              <HelpCircle size={20} />
              <span>Help & FAQs</span>
            </Link>
            <Link to="/settings" className="flex items-center space-x-3 hover:text-indigo-400">
              <Settings size={20} />
              <span>Settings</span>
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
            <Link to="/wishlist" className="flex items-center space-x-3 hover:text-indigo-400">
              <Heart size={20} />
              <span>Wishlist</span>
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
            {/* Admin-Only Links */}
            {userRole === "admin" && (
              <>
                <div className="text-sm text-gray-400 uppercase mt-4">Admin Panel</div>
                <Link to="/adminpanel" className="flex items-center space-x-3 hover:text-indigo-400">
                  <Shield size={20} />
                  <span>Admin Panel</span>
                </Link>
                <Link to="/manage-products" className="flex items-center space-x-3 hover:text-indigo-400">
                  <Package size={20} />
                  <span>Manage Products</span>
                </Link>
                <Link to="/manage-users" className="flex items-center space-x-3 hover:text-indigo-400">
                  <Users size={20} />
                  <span>Manage Users</span>
                </Link>
                <Link to="/manage-orders" className="flex items-center space-x-3 hover:text-indigo-400">
                  <ShoppingCart size={20} />
                  <span>Manage Orders</span>
                </Link>
              </>
            )}

            {/* Logout Button */}
            <button onClick={handleLogout} className="flex items-center space-x-3 hover:text-red-400">
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </>
        )}
        
        {/* Login for Guests */}
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
