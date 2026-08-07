// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: { "Content-Type": "application/json" },
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // --- Auth endpoints - the current user's own session only.
// // Admin management of OTHER users lives in userApi.js instead. ---

// // POST /api/users/register - public
// export const registerApi = async (userData) => {
//   const { data } = await api.post("/users/register", userData);
//   return data;
// };

// // POST /api/users/login - public
// export const loginApi = async (credentials) => {
//   const { data } = await api.post("/users/login", credentials);
//   return data;
// };

// // GET /api/users/profile - private, returns the logged-in user's own info
// export const getProfileApi = async () => {
//   const { data } = await api.get("/users/profile");
//   return data;
// };

// // PUT /api/users/profile - private, updates the logged-in user's own info
// export const updateProfileApi = async (userData) => {
//   const { data } = await api.put("/users/profile", userData);
//   return data;
// };

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

// --- Auth endpoints - the current user's own session only.
// Admin management of OTHER users lives in userApi.js instead. ---

// POST /api/users/register - public
export const registerApi = async (userData) => {
  const { data } = await api.post("/users/register", userData);
  return data;
};

// POST /api/users/login - public
export const loginApi = async (credentials) => {
  const { data } = await api.post("/users/login", credentials);
  return data;
};

// GET /api/users/profile - private, returns the logged-in user's own info
export const getProfileApi = async () => {
  const { data } = await api.get("/users/profile");
  return data;
};

// PUT /api/users/profile - private, updates the logged-in user's own name/email
export const updateProfileApi = async (userData) => {
  const { data } = await api.put("/users/profile", userData);
  return data;
};

// PUT /api/users/profile/avatar - private, multipart/form-data (a real file,
// not JSON) - this is why it can't reuse the `api` instance's default
// Content-Type: application/json header; the browser needs to set its own
// multipart boundary header, so it's explicitly overridden here.
export const uploadAvatarApi = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const { data } = await api.put("/users/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  console.log("Data", data);

  return data;
};
