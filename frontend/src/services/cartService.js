import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const fetchCart = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cart`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    await axios.post(`${API_BASE_URL}/cart/add`, { productId, quantity }, { withCredentials: true });
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const updateCartQuantity = async (productId, quantity) => {
  try {
    await axios.put(`${API_BASE_URL}/cart/update`, { productId, quantity }, { withCredentials: true });
  } catch (error) {
    console.error("Error updating cart quantity:", error);
  }
};

export const removeFromCart = async (productId) => {
  try {
    await axios.delete(`${API_BASE_URL}/cart/remove/${productId}`, { withCredentials: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};
