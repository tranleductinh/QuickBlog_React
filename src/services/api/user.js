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
