import { useState } from "react";
import { useSelector } from "react-redux";

const ProductListing = () => {
  const products = useSelector((state) => state.products);
  const [category, setCategory] = useState("");

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <select onChange={(e) => setCategory(e.target.value)} className="p-2 border mb-4">
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListing;
