import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const FALLBACK_IMAGE = require("../assets/images/product.png"); // Fallback image

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(FALLBACK_IMAGE);

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(response.data);

      // Ensure image array is valid & set the first image as default
      const imageArray = Array.isArray(response.data.image) ? response.data.image : JSON.parse(response.data.image || "[]");
      setSelectedImage(imageArray.length > 0 ? imageArray[0] : FALLBACK_IMAGE);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch reviews
  const fetchReviews = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}/reviews`);
      setReviews(response.data.slice(0, 5)); // Show last 5 reviews
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }, [id]);

  // Fetch similar products
  const fetchSimilarProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/similar/${id}`);
      setSimilarProducts(response.data);
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
    fetchReviews();
    fetchSimilarProducts();
  }, [fetchProduct, fetchReviews, fetchSimilarProducts]);

  // Submit a review
  const submitReview = async () => {
    try {
      await axios.post(`${API_BASE_URL}/products/${id}/reviews`, { rating, comment });
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  // Handle multiple images
  const imageArray = Array.isArray(product.image) ? product.image : JSON.parse(product.image || "[]");

  return (
    <Container className="my-5">
      {/* Product Name & Short Description */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-700 mt-2">
            {product.shortDescription || "A high-quality product with exceptional features."}
          </p>
        </Col>
      </Row>

      {/* Image & Details Section */}
      <Row className="align-items-start">
        {/* Product Image Section */}
        <Col md={5}>
          <Card className="shadow-lg p-3">
            <Card.Img
              variant="top"
              src={selectedImage}
              alt={product.name}
              className="w-100 h-auto rounded"
              style={{ maxHeight: "300px", objectFit: "contain" }}
              onError={(e) => (e.target.src = FALLBACK_IMAGE)} // Set fallback if image fails
            />
          </Card>

          {/* Scrollable Image Row */}
          <div className="mt-3 overflow-x-auto flex gap-2 scrollbar-hide" style={{ whiteSpace: "nowrap" }}>
            {imageArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover border-2 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                } rounded cursor-pointer`}
                onClick={() => setSelectedImage(img)}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
              />
            ))}
          </div>
        </Col>

        {/* Product Details & Price */}
        <Col md={7}>
          <Card.Body>
            <h3 className="text-2xl font-semibold">Product Details</h3>
            <ul className="list-disc ml-5 text-gray-700">
              {product.description
                ? product.description.split(". ").map((point, index) => (
                    <li key={index} className="py-1">{point}</li>
                  ))
                : <li>No description available.</li>}
            </ul>
            <h3 className="text-xl font-bold mt-4 text-blue-600">${product.price}</h3>
            <Button variant="primary" onClick={() => dispatch(addToCart(product))} className="mt-3">
              Add to Cart 🛒
            </Button>
          </Card.Body>
        </Col>
      </Row>

      {/* Product Reviews */}
      <div className="mt-5">
        <h3 className="text-xl font-bold">Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          <ul className="list-disc ml-5">
            {reviews.map((review, index) => (
              <li key={index} className="py-1">
                <strong>⭐ {review.rating}/5</strong> - {review.comment}
              </li>
            ))}
          </ul>
        )}

        {/* Review Form */}
        <div className="mt-4">
          <h4>Leave a Review</h4>
          <Form>
            <Form.Group>
              <Form.Label>Rating:</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Comment:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <Button onClick={submitReview} className="mt-3">
              Submit Review
            </Button>
          </Form>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-5">
        <h3 className="text-xl font-bold">Similar Products</h3>
        <div className="flex gap-4 overflow-x-auto mt-3 scrollbar-hide">
          {similarProducts.map((item) => (
            <Card
              key={item.id}
              className="w-40 mx-2 cursor-pointer shadow-sm border rounded-lg p-2 transition-transform transform hover:scale-105"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <Card.Img
                variant="top"
                src={item.image}
                alt={item.name}
                className="h-28 object-cover rounded"
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
              />
              <Card.Body className="text-center">
                <Card.Title className="text-xs font-semibold">{item.name}</Card.Title>
                <Card.Text className="text-sm text-gray-600">${item.price}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default ProductDetails;
