// import axios from "axios";
import api from "./api";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// GET /api/cart - private
export const getCartApi = async () => {
  const { data } = await api.get("/cart");
  return data;
};

// // POST /api/cart/add - private
// export const addToCartApi = async (productId, quantity = 1) => {
//   const { data } = await api.post("/cart/add", { productId, quantity });
//   return data;
// };

// // PUT /api/cart/update/:productId - private
// export const updateCartItemApi = async (productId, quantity) => {
//   const { data } = await api.put(`/cart/update/${productId}`, { quantity });
//   return data;
// };

// // DELETE /api/cart/remove/:productId - private
// export const removeCartItemApi = async (productId) => {
//   const { data } = await api.delete(`/cart/remove/${productId}`);
//   return data;
// };
export const addToCartApi = async (productId, quantity, size, color) => {
  const { data } = await api.post("/cart/add", {
    productId,
    quantity,
    size,
    color,
  });
  return data;
};

export const updateCartItemApi = async (itemId, quantity) => {
  const { data } = await api.put(`/cart/update/${itemId}`, { quantity });
  return data;
};

export const removeCartItemApi = async (itemId) => {
  const { data } = await api.delete(`/cart/remove/${itemId}`);
  return data;
};

// DELETE /api/cart/clear - private
export const clearCartApi = async () => {
  const { data } = await api.delete("/cart/clear");
  return data;
};
