import axios from "axios";

export const login = async ({ username, password }: { username: string; password: string }) => {
    const response = await axios.post("http://localhost:5172/api/auth/login", {
        username,
        password,
    });
    localStorage.setItem("token", response.data.Token);
};

export const logout = () => {
    localStorage.removeItem("token");
};
