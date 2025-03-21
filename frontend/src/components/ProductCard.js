import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMAGE = "/products/product.png"; // ✅ Updated fallback image path

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // ✅ Ensure images are parsed properly
  const imageArray = Array.isArray(product.image)
    ? product.image
    : JSON.parse(product.image || "[]");

  // ✅ Use first image & ensure valid URL
  const productImage = imageArray.length > 0 
    ? `/products/${imageArray[0].split("/").pop()}` 
    : FALLBACK_IMAGE;

  // ✅ Star rating logic
  const renderStars = () => {
    const rating = Math.round(product.rating || 0);
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-warning" : "text-muted"}>
        ★
      </span>
    ));
  };

  return (
    <Card className="shadow-sm border rounded-lg p-2 cursor-pointer transition-transform transform hover:scale-105" style={{ width: '200px' }}>
      {/* Clickable Image */}
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <Card.Img
          variant="top"
          src={productImage}
          alt={product.name}
          className="h-40 object-cover rounded"
          onError={(e) => (e.target.src = FALLBACK_IMAGE)} // ✅ Handle broken images
        />
        <Card.Body className="text-center">
          <Card.Title className="text-sm font-semibold">{product.name}</Card.Title>
          <Card.Text className="text-gray-600 text-xs">Ksh {parseFloat(product.price || 0).toFixed(2)}</Card.Text>
          <div className="text-xs">{renderStars()}</div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default ProductCard;
