import api from "./api";

export const initializePaymentApi = async (orderId) => {
  const { data } = await api.post("/payments/initialize", { orderId });
  return data;
};

export const verifyPaymentApi = async (reference) => {
  const { data } = await api.get("/payments/verify", {
    params: { reference },
  });
  return data;
};
