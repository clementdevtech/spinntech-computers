import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";
import OrderPlacement from "./components/OrderPlacement";
import ProductDetails from "./pages/ProductDetails";
import Affiliate from "./pages/Affiliate";
import AdminPanel from "./pages/AdminPanel";
import AdminChat from "./pages/AdminChat";
import OrderManagement from "./pages/OrderManagement";
import ProductManager from "./pages/ProductManagement";
import UserManagement from "./pages/UserManagement";
import AdminRoles from "./pages/AdminRoles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order" element={<OrderPlacement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/affiliate" element={<Affiliate />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* ✅ Updated Nested Admin Routes */}
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route index element={<AdminPanel />} />
            <Route path="manage-orders" element={<OrderManagement />} />
            <Route path="manage-products" element={<ProductManager />} />
            <Route path="manage-users" element={<UserManagement />} />
            <Route path="admin-chat" element={<AdminChat />} />
            <Route path="admin-roles" element={<AdminRoles />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

/** ✅ Admin Layout Component to Load Child Routes */
function AdminLayout() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Outlet /> {/* ✅ Renders child routes inside admin */}
    </div>
  );
}

export default App;
