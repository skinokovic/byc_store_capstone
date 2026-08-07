import api from "./api";
// api's baseURL is just VITE_API_URL (no /api suffix), so every path below
// includes the /api/arrival prefix explicitly.

// GET all arrivals. Pass activeOnly=true for the public homepage.
export const fetchArrivals = async (activeOnly = false) => {
  const { data } = await api.get("/arrival/arrivals", {
    params: activeOnly ? { active: true } : {},
  });
  return data;
};

// admin-only, requires auth
export const fetchArrivalById = async (id) => {
  const { data } = await api.get(`/arrival/arrivals/${id}`);
  return data;
};

// formData must contain: title, subtitle, category, isActive, order, image (File)
export const createArrival = async (formData) => {
  console.log("ArrivalApi hit");
  const { data } = await api.post("/arrival/create", formData, {
    // headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const updateArrival = async (id, formData) => {
  const { data } = await api.put(`/arrival/update/${id}`, formData, {
    // headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteArrival = async (id) => {
  const { data } = await api.delete(`/arrival/delete/${id}`);
  return data;
};

// quick active/inactive toggle from the table, without touching other fields
export const toggleArrivalActive = async (id, nextActive) => {
  const fd = new FormData();
  fd.append("isActive", nextActive);
  const { data } = await api.put(`/arrival/update/${id}`, fd, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};
