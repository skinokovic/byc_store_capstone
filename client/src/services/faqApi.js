import api from "./api";

// GET /api/faqs - public
export const getFaqsApi = async () => {
  const { data } = await api.get("/faqs");
  return data;
};

// GET /api/faqs/admin - admin only
export const getAllFaqsAdminApi = async () => {
  const { data } = await api.get("/faqs/admin");
  return data;
};

// POST /api/faqs - admin only
export const createFaqApi = async (payload) => {
  const { data } = await api.post("/faqs", payload);
  return data;
};

// PUT /api/faqs/:id - admin only
export const updateFaqApi = async (id, payload) => {
  const { data } = await api.put(`/faqs/${id}`, payload);
  return data;
};

// DELETE /api/faqs/:id - admin only
export const deleteFaqApi = async (id) => {
  const { data } = await api.delete(`/faqs/${id}`);
  return data;
};
