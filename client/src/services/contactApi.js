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

// POST /api/contact - public, no auth needed to submit
export const submitContactApi = async (formData) => {
  const { data } = await api.post("/message/send-message", formData);
  return data;
};

// GET /api/users - private, admin only
export const getMessageApi = async () => {
  const { data } = await api.get("/message");
  return data;
};

// GET /api/message/:id - private, admin only
export const getMessageByIdApi = async (id) => {
  const { data } = await api.get(`/message/${id}`);
  return data;
};

// PUT /api/message/:id - private, admin only (changes role/isActive)
export const updateMessageApi = async (id, updates) => {
  const { data } = await api.put(`/message/${id}`, updates);
  return data;
};

// DELETE /api/message/:id - private, admin only
export const deleteMessageApi = async (id) => {
  const { data } = await api.delete(`/message/${id}`);
  return data;
};
