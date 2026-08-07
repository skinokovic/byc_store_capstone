// import axios from "axios";
import api from "./api";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// POST /api/orders/create - private
// change createOrderApi to accept both:
export const createOrderApi = async (addressId, paymentMethod) => {
  const { data } = await api.post("/orders/create", {
    addressId,
    paymentMethod,
  });
  return data;
};

// GET /api/orders/my-orders - private
export const getMyOrdersApi = async () => {
  const { data } = await api.get("/orders/my-orders");
  return data;
};

// GET /api/orders/:id - private (owner or admin)
export const getOrderByIdApi = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

// PUT /api/orders/cancel/:id - private
export const cancelOrderApi = async (id) => {
  const { data } = await api.put(`/orders/cancel/${id}`);
  return data;
};

// GET /api/orders - admin only, optional ?status= filter
export const getAllOrdersApi = async (params = {}) => {
  const { data } = await api.get("/orders", { params });
  return data;
};

// PUT /api/orders/update-status/:id - admin only
export const updateOrderStatusApi = async (id, payload) => {
  const { data } = await api.put(`/orders/update-status/${id}`, payload);
  return data;
};
