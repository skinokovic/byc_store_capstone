import api from "./api";

// GET /api/faqs/admin - admin only
export const getDashboard = async () => {
  const { data } = await api.get("/dashboard");
  return data;
};
