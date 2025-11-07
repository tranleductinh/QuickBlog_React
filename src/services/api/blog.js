import api from "../api";
export const getBlogs = async () => {
  return await api.get("/posts");
};

export const getDetails = async (id) => {
  return await api.get(`/posts/${id}`);
};
export const createBlog = async (blog) => {
  return await api.post("/posts", blog);
};

export const deleteBlog = async (id) => {
  return await api.delete(`/posts/${id}`);
};
