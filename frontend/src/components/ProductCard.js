import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const placeholderImage = "https://via.placeholder.com/150"; // Placeholder if no image

  return (
    <Card className="shadow-sm border rounded-lg p-3">
      <Card.Img
        variant="top"
        src={product.image || placeholderImage}
        alt={product.name}
        className="h-48 object-cover rounded"
      />
      <Card.Body>
        <Card.Title className="text-lg font-semibold">{product.name}</Card.Title>
        <Card.Text className="text-gray-600">${product.price}</Card.Text>

        {/* Rating */}
        <div className="text-yellow-500">⭐ {product.rating || "No ratings"}/5</div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-3">
          <Button
            onClick={() => dispatch(addToCart(product))}
            variant="primary"
            className="w-1/2"
          >
            Add to Cart
          </Button>
          <Link to={`/product/${product.id}`} className="w-1/2">
            <Button variant="secondary">View Details</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
