import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-red-600">404</h2>
      <p className="text-lg text-gray-600">Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Go Home</Link>
    </div>
  );
};

export default NotFound;
