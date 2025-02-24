// Updated Home.js with hero section, featured products, customer reviews, promotional offer, and animated chat support
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductListing from "../components/ProductListing";
import Sidebar from "../components/ui/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUserRole(user.role);
    }
    const welcomeMessages = [
      "Hello! Welcome to our site.",
      "How can we assist you today?",
    ];
    let index = 0;
    const interval = setInterval(() => {
      if (index < welcomeMessages.length) {
        setChatMessages((prev) => [
          ...prev,
          { text: welcomeMessages[index], sender: "bot" },
        ]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole("user");
    navigate("/login");
  };

  const sendMessage = (message) => {
    if (!message.trim()) return;
    setChatMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: "Thank you for your message. We will assist you shortly!", sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="bg-light min-vh-100 relative overflow-hidden">
      <Sidebar isLoggedIn={isLoggedIn} userRole={userRole} handleLogout={handleLogout} />

      {/* Hero Section */}
      <section
        className="hero-section position-relative text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('/assets/hero-banner.jpg')",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-dark bg-opacity-50 p-5 rounded shadow-lg">
          <h1 className="display-4 fw-bold">Shop the Latest Trends</h1>
          <p className="lead">Find exclusive deals on high-quality products.</p>
          <div className="mt-3">
            <Link to="/shop" className="btn btn-success btn-lg me-3 shadow-sm">
              Shop Now
            </Link>
            <Link to="/register" className="btn btn-primary btn-lg shadow-sm">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container py-5">
        <h2 className="text-center fw-bold mb-4">Featured Products</h2>
        <ProductListing />
      </section>

      {/* Why Choose Us Section */}
      <section className="container py-5 bg-white text-center rounded shadow-sm">
        <h3 className="fw-bold mb-4">Why Shop With Us?</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="text-success fw-semibold">🚀 Fast Shipping</h4>
              <p>We deliver your products quickly and efficiently.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="text-primary fw-semibold">🔒 Secure Payments</h4>
              <p>Your transactions are safe and encrypted.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-light rounded shadow-sm">
              <h4 className="text-warning fw-semibold">📞 24/7 Support</h4>
              <p>We are always here to assist you.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="container py-5 bg-light text-center rounded shadow-sm">
        <h3 className="fw-bold mb-4">What Our Customers Say</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted fst-italic">"Amazing products and super fast delivery!"</p>
              <p className="fw-bold text-secondary">- Sarah W.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted fst-italic">"The best shopping experience ever! Highly recommend."</p>
              <p className="fw-bold text-secondary">- James K.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded shadow-sm">
              <p className="text-muted fst-italic">"Excellent customer service and great prices."</p>
              <p className="fw-bold text-secondary">- Emily R.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Promotional Offer */}
      <section className="container py-5 text-center bg-danger text-white rounded shadow-sm">
        <h3 className="fw-bold mb-2">Limited-Time Offer! 🚀</h3>
        <p>Enjoy exclusive discounts on select products. Hurry before the offer ends!</p>
        <Link to="/shop" className="btn btn-light btn-lg fw-bold mt-2 shadow-sm">
          Grab the Deals
        </Link>
      </section>

      {/* Chat Support Section */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: showChat ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="fixed bottom-4 left-4 bg-white p-4 shadow-lg rounded-lg w-80 z-50"
      >
        <h3 className="text-lg font-semibold mb-2">Live Chat Support</h3>
        <div className="h-48 overflow-y-auto border p-2 rounded">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`p-1 rounded ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>
        <div className="d-flex mt-2">
          <input
            type="text"
            className="form-control w-100"
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage(e.target.value)}
          />
          <button
            onClick={() => setShowChat(!showChat)}
            className="btn btn-primary ms-2"
          >
            {showChat ? "Close" : "Chat"}
          </button>
        </div>
      </motion.div>

      {/* Chat toggle button */}
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-4 left-4 bg-primary text-white p-3 rounded-full shadow-lg"
        >
          Chat Support
        </button>
      )}
    </div>
  );
};

export default Home;
