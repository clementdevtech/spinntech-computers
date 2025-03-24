import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../assets/css/ProductCard.css";

const FALLBACK_IMAGE = "/products/product.png";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const imageArray = Array.isArray(product.image)
    ? product.image
    : JSON.parse(product.image || "[]");

  const productImage = imageArray.length > 0 
    ? `/products/${imageArray[0].split("/").pop()}` 
    : FALLBACK_IMAGE;

  const renderStars = () => {
    const rating = Math.round(product.rating || 0);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star-filled" : "star-empty"}>
        ★
      </span>
    ));
  };

  return (
    <Card className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
      <Card.Img
        variant="top"
        src={productImage}
        alt={product.name}
        className="product-card-image"
        onError={(e) => (e.target.src = FALLBACK_IMAGE)}
      />
      <Card.Body className="text-center">
        <Card.Title className="product-card-title">{product.name}</Card.Title>
        <Card.Text className="product-card-price">Ksh {parseFloat(product.price || 0).toFixed(2)}</Card.Text>
        <div className="product-card-stars">{renderStars()}</div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
