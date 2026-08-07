import axios from "axios";

// axios instance lives directly in this file now instead of a separate
// axiosClient.js - if you add more resource-specific API files later
// (e.g. userApi.js, cartApi.js), each will need this same setup block
// duplicated, since there's no longer a shared instance to import.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // headers: { "Content-Type": "application/json" },
});

// Attaches the JWT saved by authSlice (login/register store it in
// localStorage) to every outgoing request. Required because the backend's
// protect middleware reads the token from the Authorization header - without
// this, createProduct/updateProduct/deleteProduct (all protect + admin-only)
// will 401 even when logged in as an admin.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Product endpoints (mirrors server/routes/productRoutes.js) ---

// GET /api/products - public, supports ?keyword= and ?category= filters
export const getProductsApi = async (params = {}) => {
  const { data } = await api.get("/products", { params });
  return data;
};

// GET /api/products/:id - public
export const getProductByIdApi = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProductApi = async (formData) => {
  console.log("Sending request...");
  const { data } = await api.post("/products/create", formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });
  console.log("Response:", data);
  return data;
};

// PUT /api/products/update/:id - protected, admin only

export const updateProductApi = async (id, formData) => {
  const { data } = await api.put(`/products/update/${id}`, formData, {
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });

  return data;
};

// DELETE /api/categories/:id - private, admin only
export const deleteProductApi = async (id) => {
  const { data } = await api.delete(`/products/delete/${id}`);
  return data;
};

// ==========================================
// Shop By Category Products
// ==========================================

export const getShopProductsApi = async ({
  parentCategory,
  category,
  limit = 8,
}) => {
  const { data } = await api.get("/products/shop-by-category", {
    params: {
      parentCategory,
      category,
      limit,
    },
  });

  return data.products;
};

export const addProductReviewApi = async (id, reviewData) => {
  const { data } = await api.post(`/products/${id}/reviews`, reviewData);
  return data;
};

export const getProductsByIdsApi = async (ids) => {
  const { data } = await api.post(`/products/by-ids`, { ids });
  return data;
};

export const getRelatedProductsApi = async (id, limit = 8) => {
  const { data } = await api.get(`/products/${id}/related`, {
    params: { limit },
  });
  return data;
};
