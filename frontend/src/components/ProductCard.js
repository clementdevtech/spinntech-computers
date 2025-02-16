import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>

      {/* Ratings */}
      <div className="text-yellow-500">⭐ {product.rating}/5</div>

      {/* Buttons */}
      <div className="flex justify-between mt-2">
        <button
          onClick={() => dispatch(addToCart(product))}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
        >
          Add to Cart
        </button>
        <button className="text-red-500">❤️</button>
      </div>

      <Link to={`/product/${product.id}`} className="block text-blue-500 mt-2 hover:underline">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
