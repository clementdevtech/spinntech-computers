import { Link } from "react-router-dom";
import ProductListing from "../components/ProductListing";

const Home = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to Our Store</h1>
      <p className="text-center text-gray-600 mb-4">Discover amazing products at the best prices.</p>

      <Link to="/register" className="block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mx-auto w-48">
        Get Started
      </Link>

      <h2 className="text-2xl font-bold mt-6">Featured Products</h2>
      <ProductListing />
    </div>
  );
};

export default Home;
