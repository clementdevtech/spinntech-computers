import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import SimilarProducts from "../components/similarProducts"; 

const API_BASE_URL = process.env.REACT_APP_API_URL;
const FALLBACK_IMAGE = "/assets/images/product.png"; // Ensure correct fallback path

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(FALLBACK_IMAGE);
  const [quantity, setQuantity] = useState(1);
  const [imageArray, setImageArray] = useState([]);

  // Fetch product details
  const fetchProduct = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${id}`);
      setProduct(response.data);

      // Ensure images are an array & set the first image as default
      const images = Array.isArray(response.data.image) ? response.data.image : JSON.parse(response.data.image || "[]");
      setImageArray(images.length > 0 ? images : [FALLBACK_IMAGE]);
      setSelectedImage(images.length > 0 ? images[0] : FALLBACK_IMAGE);
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
      {/* Product Name & Short Description */}
      <Row className="mb-4">
        <Col>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-lg text-gray-700 mt-2">{product.shortDescription || "A high-quality product."}</p>
        </Col>
      </Row>

      {/* Product Image & Details Section */}
      <Row className="align-items-start">
        {/* Product Image Section */}
        <Col md={5}>
          <Card className="shadow-lg p-3">
            <Card.Img
              variant="top"
              src={selectedImage}
              alt={product.name}
              className="w-100 h-auto rounded"
              style={{ maxHeight: "350px", objectFit: "contain" }}
              onError={(e) => (e.target.src = FALLBACK_IMAGE)}
            />
          </Card>

          {/* Scrollable Image Row */}
          <div className="mt-3 overflow-x-auto d-flex gap-2" style={{ whiteSpace: "nowrap" }}>
            {imageArray.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className={`w-20 h-20 object-cover border-2 ${
                  selectedImage === img ? "border-primary" : "border-secondary"
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
            <p className="text-gray-700">{product.description || "No description available."}</p>
            <h3 className="text-xl font-bold mt-4 text-primary">${product.price}</h3>

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
