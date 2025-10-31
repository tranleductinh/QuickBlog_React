import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // Biến môi trường cho base URL
  timeout: 10000,                         // Timeout 10 giây
  headers: {
    "Content-Type": "application/json",   // Header JSON mặc định
  },
});

export default api;