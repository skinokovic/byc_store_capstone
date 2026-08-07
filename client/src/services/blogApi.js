import api from "./api";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// --- Blog endpoints (mirrors server/routes/blogRoutes.js) ---

// GET /api/blogs - public, optional ?active= filter
export const getBlogsApi = async (params = {}) => {
  const { data } = await api.get("/blogs", { params });
  return data;
};

// GET /api/blogs/:idOrSlug - public
export const getBlogByIdApi = async (idOrSlug) => {
  const { data } = await api.get(`/blogs/${idOrSlug}`);
  return data;
};

// POST /api/blogs/create - protected, admin only, multipart (coverImage + avatar)
export const createBlogApi = async (formData) => {
  const { data } = await api.post("/blogs/create", formData);
  return data;
};

// PUT /api/blogs/update/:id - protected, admin only, multipart
export const updateBlogApi = async (id, formData) => {
  const { data } = await api.put(`/blogs/update/${id}`, formData);
  return data;
};

// DELETE /api/blogs/delete/:id - protected, admin only
export const deleteBlogApi = async (id) => {
  const { data } = await api.delete(`/blogs/delete/${id}`);
  return data;
};

// PATCH /api/blogs/:id/view - public, called once when a visitor opens a post
export const incrementBlogViewApi = async (id) => {
  const { data } = await api.patch(`/blogs/${id}/view`);
  return data;
};

// PATCH /api/blogs/:id/like - public, no login required
export const likeBlogApi = async (id) => {
  const { data } = await api.patch(`/blogs/${id}/like`);
  return data;
};
