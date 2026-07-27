import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5555";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
