import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import SimilarProducts from "../components/similarProducts"; 

const API_BASE_URL = process.env.REACT_APP_API_URL;
const FALLBACK_IMAGE = "/products/fallback.png";

const ProductDetails = () => {
  const { id } = useParams();
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
    <Container className="my-5">
      <Row className="mb-4 text-center">
        <Col xs={12}>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-700 mt-2">{product.shortDescription || "A high-quality product."}</p>
        </Col>
      </Row>

      <Row className="align-items-start">
        {/* Product Image Section */}
        <Col xs={12} md={6} className="text-center">
          <Card className="shadow-lg p-3">
            <Card.Img
              variant="top"
              src={selectedImage}
              alt={product.name}
              className="w-100 h-auto rounded"
              style={{ maxHeight: "400px", objectFit: "contain" }}
              onError={(e) => (e.target.src = FALLBACK_IMAGE)}
            />
          </Card>

          {/* Scrollable Thumbnail Gallery */}
          <div 
            className="d-flex flex-wrap gap-2 justify-content-center mt-3"
            style={{
              overflowX: "auto",
              maxWidth: "100%",
            }}
          >
            {imageArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`border-2 rounded cursor-pointer ${selectedImage === img ? "border-primary shadow-lg scale-105" : "border-gray-300"}`}
                onClick={() => setSelectedImage(img)}
                onError={(e) => (e.target.src = FALLBACK_IMAGE)}
                style={{
                  width: "80px",
                  height: "80px",
                  transition: "transform 0.2s ease-in-out",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </Col>

        {/* Product Details & Price */}
        <Col xs={12} md={6}>
          <Card.Body>
            <h3 className="text-2xl font-semibold">Product Details</h3>
            <p className="text-gray-700">{product.description || "No description available."}</p>
            <h3 className="text-xl font-bold mt-4 text-primary">Ksh {product.price}</h3>

            {/* Quantity Selector */}
            <div className="d-flex align-items-center mt-3">
              <Button variant="outline-secondary" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
              <span className="mx-3">{quantity}</span>
              <Button variant="outline-secondary" onClick={() => setQuantity(quantity + 1)}>+</Button>
            </div>

            {/* Add to Cart Button */}
            <Button
              variant="success"
              className="mt-3 w-100"
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
            >
              Add to Cart 🛒
            </Button>
          </Card.Body>
        </Col>
      </Row>

      {/* Similar Products Section */}
      <SimilarProducts productId={id} />
    </Container>
  );
};

export default ProductDetails;
