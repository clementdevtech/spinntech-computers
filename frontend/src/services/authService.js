import API from "../utils/api";

export const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};
