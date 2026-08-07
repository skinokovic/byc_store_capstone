import api from "./api";

export const getSlidersApi = async () => {
  const { data } = await api.get("/slider/sliders");
  return data;
};

export const getSliderByIdApi = async (id) => {
  const { data } = await api.get(`/slider/slider/${id}`);
  return data;
};

export const createSliderApi = async (formData) => {
  console.log("data got here api");
  console.log("===== FORM DATA =====");

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const { data } = await api.post("/slider/create", formData);
  return data;
};

export const updateSliderApi = async (id, formData) => {
  const { data } = await api.put(`/slider/update/${id}`, formData);
  return data;
};

export const deleteSliderApi = async (id) => {
  const { data } = await api.delete(`/slider/delete/${id}`);
  return data;
};
