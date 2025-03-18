const API_BASE_URL = process.env.REACT_APP_API_URL

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch product categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};


// Fetch a single product by ID
export const fetchProductById = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error("Failed to fetch products by category");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Add a new product
export const addProduct = async (productData) => {
  const formData = new FormData();
  Object.keys(productData).forEach((key) => {
    if (key === "images") {
      productData.images.forEach((image) => formData.append("images", image));
    } else {
      formData.append(key, productData[key]);
    }
  });

  const response = await fetch(`${API_BASE_URL}/products/createproduct`, {
    method: "POST",
    body: formData,
    credentials: "include",
});


  return await response.json();
};

// Update a product
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/updateproduct/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await fetch(`${API_BASE_URL}/products/delete/${id}`, { method: "DELETE", credentials: "include" });
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
