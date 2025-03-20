import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const FALLBACK_IMAGE = "/products/fallback.png"; // ✅ Updated fallback image path

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quantity = 1;

  // ✅ Ensure images are parsed properly
  const imageArray = Array.isArray(product.image)
    ? product.image
    : JSON.parse(product.image || "[]");

  // ✅ Use first image & ensure valid URL
  const productImage = imageArray.length > 0 
    ? `/products/${imageArray[0].split("/").pop()}` 
    : FALLBACK_IMAGE;

  return (
    <Card className="shadow-sm border rounded-lg p-3 cursor-pointer transition-transform transform hover:scale-105">
      {/* Clickable Image */}
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <Card.Img
          variant="top"
          src={productImage}
          alt={product.name}
          className="h-48 object-cover rounded"
          onError={(e) => (e.target.src = FALLBACK_IMAGE)} // ✅ Handle broken images
        />
        <Card.Body className="text-center">
          <Card.Title className="text-lg font-semibold">{product.name}</Card.Title>
          <Card.Text className="text-gray-600">
            Ksh {parseFloat(product.price || 0).toFixed(2)}
          </Card.Text>
        </Card.Body>
      </div>

      {/* Add to Cart Button */}
      <Button
        variant="success"
        className="mt-3 w-100"
        onClick={() => dispatch(addToCart({ ...product, quantity }))}
      >
        Add to Cart 🛒
      </Button>
    </Card>
  );
};

export default ProductCard;
