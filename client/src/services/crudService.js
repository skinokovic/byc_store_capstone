import api from "./api";

export const createCrudService = (endpoint) => ({
  getAll: async () => {
    const { data } = await api.get(endpoint);

    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`${endpoint}/${id}`);

    return data;
  },

  create: async (payload) => {
    const { data } = await api.post(endpoint, payload);

    return data;
  },

  update: async (id, payload) => {
    const { data } = await api.put(`${endpoint}/${id}`, payload);

    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`${endpoint}/${id}`);

    return data;
  },
});
