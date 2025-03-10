import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const placeholderImage = require("../assets/images/product.png");
  const imageArray = typeof product.image === "string" ? JSON.parse(product.image) : product.image;
  const imageUrl = product.image?.[0]
    ? require(`../assets/products/${imageArray[0].split('/').pop()}`)
    : placeholderImage;

  // Calculate average rating
  const averageRating = product.reviews?.length
    ? (
        product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
      ).toFixed(1)
    : "No ratings yet";

  return (
    <Card 
      className="shadow-sm border rounded-lg p-3 cursor-pointer transition-transform transform hover:scale-105"
    >
      <div onClick={() => navigate(`/product/${product.id}`)}>
        <Card.Img
          variant="top"
          src={imageUrl}
          alt={product.name}
          className="h-48 object-cover rounded"
        />
        <Card.Body className="text-center">
          <Card.Title className="text-lg font-semibold">{product.name}</Card.Title>
          <div className="text-yellow-500">
            {product.reviews?.length ? "⭐".repeat(Math.round(averageRating)) : "No ratings yet"}
          </div>
          <Card.Text className="text-gray-600">${product.price}</Card.Text>
        </Card.Body>
      </div>

      {/* Add to Cart Button */}
      <Button 
        onClick={() => dispatch(addToCart(product))}
        variant="primary"
        className="w-full mt-2"
      >
        Add to Cart 🛒
      </Button>
    </Card>
  );
};

export default ProductCard;
