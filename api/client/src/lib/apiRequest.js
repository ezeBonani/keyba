import axios from "axios";

const apiRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8800/api",
  withCredentials: true,
});

console.log(import.meta.env.VITE_BACKEND_URL);

export default apiRequest;
