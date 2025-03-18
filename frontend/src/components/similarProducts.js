import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_URL;
const FALLBACK_IMAGE = require("../assets/images/product.png");

const SimilarProducts = ({ productId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/similar/${productId}`);
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  if (similarProducts.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold">Recommended for You</h3>
      <Row>
        {similarProducts.map((item) => (
          <Col key={item.id} md={3} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={Array.isArray(item.image) ? item.image[0] : FALLBACK_IMAGE}
                alt={item.name}
                className="w-100 h-48 object-cover"
              />
              <Card.Body>
                <h5 className="text-lg font-bold">{item.name}</h5>
                <p className="text-sm text-gray-600">${item.price}</p>
                <Button variant="primary" className="w-100" onClick={() => navigate(`/product/${item.id}`)}>
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SimilarProducts;
