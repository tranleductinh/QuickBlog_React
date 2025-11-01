import api from "../api";
export const getBlogs = async () => {
  return await api.get("/posts");
};

export const getDetails = async (id) => {
  return await api.get(`/posts/${id}`);
};
