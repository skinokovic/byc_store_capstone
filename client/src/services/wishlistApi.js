import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// GET /api/wishlist - private
export const getWishlistApi = async () => {
  const { data } = await api.get("/wishlist");
  return data;
};

// POST /api/wishlist/add - private
export const addToWishlistApi = async (productId) => {
  const { data } = await api.post("/wishlist/add", { productId });
  return data;
};

// DELETE /api/wishlist/remove/:productId - private
export const removeFromWishlistApi = async (productId) => {
  const { data } = await api.delete(`/wishlist/remove/${productId}`);
  return data;
};
