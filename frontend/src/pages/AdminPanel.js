import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Dashboard from "./Dashboard";
import ProductManagement from "../pages/ProductManagement";
import UserManagement from "../pages/UserManagement";
import OrderManagement from "../pages/OrderManagement";
import AdminChat from "../pages/AdminChat";
import AdminRoles from "../pages/AdminRoles";
import AffiliateDashboard from "../components/AffiliateDashboard";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminPanel = () => {
  return (
    <div className="d-flex min-vh-100 bg-light">
      {/* Sidebar Navigation */}
      <aside className="bg-white shadow p-3" style={{ width: "250px" }}>
        <div className="border-bottom pb-3 mb-3 text-center">
          <h2 className="h5">Admin Panel</h2>
        </div>
        <nav className="nav flex-column">
          <NavLink to="dashboard" className="nav-link">Dashboard</NavLink>
          <NavLink to="manage-products" className="nav-link">Manage Products</NavLink>
          <NavLink to="manage-users" className="nav-link">Manage Users</NavLink>
          <NavLink to="manage-orders" className="nav-link">Manage Orders</NavLink>
          <NavLink to="admin-chat" className="nav-link">Admin Chat</NavLink>
          <NavLink to="affiliates" className="nav-link">Affiliate Dashboard</NavLink>
          <NavLink to="admin-roles" className="nav-link">Admin Roles</NavLink>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-grow-1 p-4">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="admin-chat" element={<AdminChat />} />
          <Route path="affiliates" element={<AffiliateDashboard />} />
          <Route path="admin-roles" element={<AdminRoles />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminPanel;