import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductListing = () => {
  const products = useSelector((state) => state.products.list) || []; 

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
