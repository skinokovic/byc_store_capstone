import api from "./api";

export const subscribeNewsletterApi = async (email) => {
  const { data } = await api.post("/newsletter/subscribe", { email });
  return data;
};

export const getSubscribersApi = async () => {
  const { data } = await api.get("/newsletter");
  return data;
};

// DELETE /api/message/:id - private, admin only
export const deleteSubscriberApi = async (id) => {
  const { data } = await api.delete(`/newsletter/${id}`);
  return data;
};
