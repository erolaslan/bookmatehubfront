import axios from "axios";

const apiClient = axios.create({
  baseURL:  "https://bookmatehub.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
