// import axios from "axios";
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

// --- Comment endpoints (mirrors server/routes/commentRoutes.js) ---

// GET /api/comments - protected, admin only, every comment across all posts
export const getAllCommentsApi = async () => {
  const { data } = await api.get("/comments");
  return data;
};

// GET /api/comments/blog/:blogId - public, flat list for one blog post
export const getCommentsForBlogApi = async (blogId) => {
  const { data } = await api.get(`/comments/blog/${blogId}`);
  return data;
};

// POST /api/comments - public, no login required
// payload: { blog, parentComment (optional), guestName, guestEmail, content }
export const createCommentApi = async (payload) => {
  const { data } = await api.post("/comments", payload);
  return data;
};

// DELETE /api/comments/:id - protected, admin only, cascades to replies
export const deleteCommentApi = async (id) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};
