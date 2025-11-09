import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Biến môi trường cho base URL
  timeout: 10000, // Timeout 10 giây
  headers: {
    "Content-Type": "application/json", // Header JSON mặc định
  },
});
api.interceptors.request.use(
  (config) => {
    const parseUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = parseUserInfo?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => response, // Truyền qua phản hồi thành công
  (error) => {
    if (window.location.href.includes("/login")) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      // Kiểm tra 401
      localStorage.removeItem("userInfo"); // Xóa token không hợp lệ
      window.location.href = "/login"; // Chuyển hướng đến đăng nhập
    }
    return Promise.reject(error); // Truyền lỗi khác
  }
);
export default api;
