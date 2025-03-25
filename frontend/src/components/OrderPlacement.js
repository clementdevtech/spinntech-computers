import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert, Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const OrderPlacement = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    phone: "",
    quantity: 1,
  });
  const [orderStatus, setOrderStatus] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user details from the backend if not in Redux
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchUserDetails();
    }
  }, [user, navigate]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/user`, { withCredentials: true });
      if (response.data) {
        setOrderDetails({
          name: response.data.name || "",
          address: response.data.address || "",
          phone: response.data.phone_number || "",
          quantity: 1,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  // ✅ Handle form input changes
  const handleInputChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // ✅ Handle order confirmation
  const confirmOrder = async () => {
    try {
      await axios.post(`${API_BASE_URL}/orders`, orderDetails);
      setOrderStatus("success");
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus("error");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-lg">
        <h2 className="text-center">Place Your Order</h2>

        {orderStatus === "success" && (
          <Alert variant="success">Order placed successfully! ✅</Alert>
        )}
        {orderStatus === "error" && (
          <Alert variant="danger">Failed to place order. ❌</Alert>
        )}

        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={orderDetails.name}
              onChange={handleInputChange}
              placeholder="Enter your name"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={orderDetails.address}
              onChange={handleInputChange}
              placeholder="Enter delivery address"
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={orderDetails.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
            />
          </Form.Group>

          <Button className="mt-3 w-100" variant="primary" onClick={() => setShowConfirmModal(true)}>
            Confirm Order 🛍
          </Button>
        </Form>
      </Card>

      {/* ✅ Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {orderDetails.name}</p>
          <p><strong>Address:</strong> {orderDetails.address}</p>
          <p><strong>Phone:</strong> {orderDetails.phone}</p>
          <p><strong>Quantity:</strong> {orderDetails.quantity}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirmOrder}>Place Order</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OrderPlacement;