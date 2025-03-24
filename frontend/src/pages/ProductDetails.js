import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import SimilarProducts from "../components/similarProducts";
import "../assets/css/ProductDetails.css"; // ✅ Import external CSS

const API_BASE_URL = process.env.REACT_APP_API_URL;
const FALLBACK_IMAGE = "/products/fallback.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(FALLBACK_IMAGE);
  const [quantity, setQuantity] = useState(1);
  const [imageArray, setImageArray] = useState([]);

  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(response.data);

      const images = Array.isArray(response.data.image)
        ? response.data.image
        : JSON.parse(response.data.image || "[]");

      const formattedImages = images.map(img => `/products/${img.split("/").pop()}`);

      setImageArray(formattedImages.length > 0 ? formattedImages : [FALLBACK_IMAGE]);
      setSelectedImage(formattedImages.length > 0 ? formattedImages[0] : FALLBACK_IMAGE);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <Container className="product-details-container">
      <Row className="mb-4 text-center">
        <Col xs={12}>
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.shortDescription || "A high-quality product."}</p>
        </Col>
      </Row>

      <Row className="align-items-start">
        {/* Product Image Section */}
        <Col xs={12} md={6} className="text-center">
          <Card className="product-image-card">
            <Card.Img
              variant="top"
              src={selectedImage}
              alt={product.name}
              className="product-main-image"
              onError={(e) => (e.target.src = FALLBACK_IMAGE)}
            />
          </Card>

          {/* Scrollable Thumbnail Gallery */}
          <div className="image-gallery">
            {imageArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${selectedImage === img ? "selected-image" : ""}`}
                onClick={() => setSelectedImage(img)}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
              />
            ))}
          </div>
        </Col>

        {/* Product Details & Price */}
        <Col xs={12} md={6}>
          <Card.Body className="product-info">
            <h3>Product Details</h3>
            <p>{product.description || "No description available."}</p>
            <h3 className="product-price">Ksh {product.price}</h3>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
              <span className="quantity-value">{quantity}</span>
              <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <Button
                variant="success"
                onClick={() => dispatch(addToCart({ ...product, quantity }))}
              >
                Add to Cart 🛒
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate("/order")}
              >
                Order Now 🛍
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>

      {/* Similar Products Section */}
      <SimilarProducts productId={id} />
    </Container>
  );
};

export default ProductDetails;
