import api from "../api";

export const login = async (user) => {
  return await api.post("/auth/login", user);
};

export const register = async (user) => {
  return await api.post("/auth/register", user);
};

export const getMe = async () => {
  return await api.get("/auth/me");
};

export const getUser = async () => {
  return await api.get("/users");
};

export const deleteUser = async (id) => {
  return await api.delete(`/users/${id}`);
};
export const setRole = async (id, role) => {
  return await api.put(`/users/${id}/role`, { role });
};
