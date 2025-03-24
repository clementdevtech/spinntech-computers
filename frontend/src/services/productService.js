const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
};

// Fetch product categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`);
    if (!response.ok) throw new Error(`Failed to fetch categories: ${response.statusText}`);
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
    if (!response.ok) throw new Error(`Failed to fetch product: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }
};

// Fetch products by category
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
    if (!response.ok) throw new Error(`Failed to fetch products by category: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching products by category:", error.message);
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

  try {
    const response = await fetch(`${API_BASE_URL}/products/createproduct`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Failed to add product: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error adding product:", error.message);
    return null;
  }
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
    if (!response.ok) throw new Error(`Failed to update product: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error updating product:", error.message);
    return null;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/delete/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) throw new Error(`Failed to delete product: ${response.statusText}`);
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error.message);
    return { success: false };
  }
};
