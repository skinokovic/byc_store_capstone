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

// --- Admin-only endpoints - managing OTHER users. ---
// The current user's own session (register/login/profile) lives in
// authApi.js instead - kept separate to avoid state.auth.user and
// state.users.list ever getting confused with each other.

// GET /api/users - private, admin only
export const getUsersApi = async () => {
  const { data } = await api.get("/users");
  return data;
};

// GET /api/users/:id - private, admin only
export const getUserByIdApi = async (id) => {
  const { data } = await api.get(`/users/${id}`);
  return data;
};

// PUT /api/users/:id - private, admin only (changes role/isActive)
export const updateUserApi = async (id, updates) => {
  const { data } = await api.put(`/users/${id}`, updates);
  return data;
};

// DELETE /api/users/:id - private, admin only
export const deleteUserApi = async (id) => {
  const { data } = await api.delete(`/users/${id}`);
  return data;
};
