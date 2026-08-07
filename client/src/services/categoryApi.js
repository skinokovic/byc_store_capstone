import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- Category endpoints (mirrors server/routes/categoryRoutes.js) ---

// GET /api/categories - public, top-level categories with nested subcategories
export const getCategoriesApi = async () => {
  const { data } = await api.get("/categories/all-categories");
  return data;
};

export const getAllCategoriesApi = async () => {
  const { data } = await api.get("/categories/all");
  return data;
};

// GET /api/categories/:idOrSlug - public, accepts either a Mongo _id or a slug
export const getCategoryApi = async (idOrSlug) => {
  const { data } = await api.get(`/categories/${idOrSlug}`);
  return data;
};

// POST /api/categories - private, admin only
export const createCategoryApi = async (category) => {
  const { data } = await api.post("/categories/create", category);
  return data;
};

// PUT /api/categories/:id - private, admin only
export const updateCategoryApi = async (id, category) => {
  const { data } = await api.put(`/categories/update/${id}`, category);
  return data;
};

// DELETE /api/categories/:id - private, admin only
export const deleteCategoryApi = async (id) => {
  const { data } = await api.delete(`/categories/delete/${id}`);
  return data;
};

// ==========================================
// Shop By Category APIs
// ==========================================

// Get Parent Categories
export const getParentCategoriesApi = async () => {
  const { data } = await api.get("/categories/parents");
  return data.categories;
};

// Get Sub Categories
export const getSubCategoriesApi = async (parentId) => {
  const { data } = await api.get(`/categories/${parentId}/subcategories`);

  return data.categories;
};
