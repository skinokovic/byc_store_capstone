import api from "./api";

// GET all collections. Pass activeOnly=true for the public homepage.
export const fetchCollections = async (activeOnly = false) => {
  const { data } = await api.get("/collection/collections", {
    params: activeOnly ? { active: true } : {},
  });
  return data;
};

// admin-only, requires auth
export const fetchCollectionById = async (id) => {
  const { data } = await api.get(`/collection/collections/${id}`);
  return data;
};

// formData must contain: title, subtitle, description, buttonText, buttonLink, order, isActive, image (File)
export const createCollection = async (formData) => {
  const { data } = await api.post("/collection/create", formData);
  return data;
};

export const updateCollection = async (id, formData) => {
  const { data } = await api.put(`/collection/update/${id}`, formData);
  return data;
};

export const deleteCollection = async (id) => {
  const { data } = await api.delete(`/collection/delete/${id}`);
  return data;
};

// quick active/inactive toggle from the table, without touching other fields
export const toggleCollectionActive = async (id, nextActive) => {
  const fd = new FormData();
  fd.append("isActive", nextActive);
  const { data } = await api.put(`/collection/update/${id}`, fd);
  return data;
};
