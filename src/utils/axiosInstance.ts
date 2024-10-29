// src/utils/axiosInstance.ts
import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://bookmatehub.com/api", // Tüm API çağrıları bu baseURL’i kullanacak
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;
