import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (!config.url) return config;

  const normalizedUrl = config.url.startsWith("/api")
    ? config.url.replace(/^\/api/, "")
    : config.url;

  config.url = normalizedUrl;
  return config;
});

export default api;
