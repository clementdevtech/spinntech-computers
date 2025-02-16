import API from "../utils/api";

export const fetchProducts = async () => {
  const response = await API.get("/products");
  return response.data;
};
