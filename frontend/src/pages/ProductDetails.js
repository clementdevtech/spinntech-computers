import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_URL

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (!product) return <p>Product not found.</p>;
  const placeholderImage = require("../assets/images/product.png");
  const imageArray = typeof product.image === "string" ? JSON.parse(product.image) : product.image;
  const imageUrl = product.image?.[0] ? require(`../assets/products/${imageArray[0].split('/').pop()}`) : placeholderImage;
  //console.log("image url:", imageUrl);

  return (
    <Container className="my-5">
      <Card className="shadow-lg p-3">
        <Card.Img variant="top" src={imageUrl} alt={product.name} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text className="fw-bold">${product.price}</Card.Text>
          <Button variant="success">Buy Now</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
