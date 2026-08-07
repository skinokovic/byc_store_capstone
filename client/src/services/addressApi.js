// import axios from "axios";
import api from "./api";
// const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// GET /api/addresses - private
export const getMyAddressesApi = async () => {
  const { data } = await api.get("/addresses");
  return data;
};

// GET /api/addresses/:id - private
export const getAddressByIdApi = async (id) => {
  const { data } = await api.get(`/addresses/${id}`);
  return data;
};

// POST /api/addresses/create - private
export const createAddressApi = async (payload) => {
  const { data } = await api.post("/addresses/create", payload);
  return data;
};

// PUT /api/addresses/update/:id - private
export const updateAddressApi = async (id, payload) => {
  const { data } = await api.put(`/addresses/update/${id}`, payload);
  return data;
};

// DELETE /api/addresses/delete/:id - private
export const deleteAddressApi = async (id) => {
  const { data } = await api.delete(`/addresses/delete/${id}`);
  return data;
};

export const addProductReviewApi = async (id, reviewData) => {
  const { data } = await api.post(`/products/${id}/reviews`, reviewData);
  return data;
};

export const getProductsByIdsApi = async (ids) => {
  const { data } = await api.post(`/products/by-ids`, { ids });
  return data;
};
