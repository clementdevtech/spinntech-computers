import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FALLBACK_IMAGE = "/products/product.png";

const SimilarProducts = ({ productId, category }) => {
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.products); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    
    const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];

   
    const recommendedProducts = products.filter(
      (product) =>
        product.category === category &&
        product.id !== productId &&
        (viewedProducts.includes(product.id) || Math.random() < 0.3)
    );

    setFilteredProducts(recommendedProducts.slice(0, 5));
  }, [productId, category, products]);

  if (filteredProducts.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="text-xl font-bold">Recommended for You</h3>
      <Row>
        {filteredProducts.map((item) => (
          <Col key={item.id} md={3} className="mb-4">
            <Card className="shadow-sm cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
              <Card.Img
                variant="top"
                src={Array.isArray(item.image) ? item.image[0] : FALLBACK_IMAGE}
                alt={item.name}
                className="w-100 h-48 object-cover"
              />
              <Card.Body>
                <h5 className="text-lg font-bold">{item.name}</h5>
                <p className="text-sm text-gray-600">${item.price}</p>
                <Button variant="primary" className="w-100">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SimilarProducts;