// import axios from "axios";
import api from "./api";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// GET /api/delivery-zones - public
export const getDeliveryZonesApi = async () => {
  const { data } = await api.get("/delivery-zones");
  return data;
};

// POST /api/delivery-zones/create - admin only
export const createDeliveryZoneApi = async (payload) => {
  const { data } = await api.post("/delivery-zones/create", payload);
  return data;
};

// PUT /api/delivery-zones/update/:id - admin only
export const updateDeliveryZoneApi = async (id, payload) => {
  const { data } = await api.put(`/delivery-zones/update/${id}`, payload);
  return data;
};

// DELETE /api/delivery-zones/delete/:id - admin only
export const deleteDeliveryZoneApi = async (id) => {
  const { data } = await api.delete(`/delivery-zones/delete/${id}`);
  return data;
};
