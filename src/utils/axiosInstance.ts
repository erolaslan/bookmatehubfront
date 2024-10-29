// src/utils/axiosInstance.ts
import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://193.57.41.39:5000/api", // Tüm API çağrıları bu baseURL’i kullanacak
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
