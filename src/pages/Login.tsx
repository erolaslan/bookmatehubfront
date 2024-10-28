import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Stack } from "@mui/material";
import { UserLogin } from "../types/auth";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axiosInstance";

const Login: React.FC = () => {
    const [formData, setFormData] = useState<UserLogin>({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        setErrorMessage(null); // Hata mesajını sıfırla
        try {
            // Giriş isteğini yap ve token'ı al
            const response = await apiClient.post("/auth/login", formData);

            // Token'ı al ve localStorage'a kaydet
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                navigate("/books"); // Başarılı giriş sonrası yönlendirme
            } else {
                setErrorMessage("Login failed: No token received.");
            }
        } catch (error) {
            // Hata durumunda mesaj göster
            setErrorMessage("Login failed: Invalid username or password.");
            console.error("Login failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            {errorMessage && <Typography color="error" gutterBottom>{errorMessage}</Typography>}
            <TextField
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                margin="normal"
            />
            <Stack direction="column" spacing={2} sx={{ mt: 2 }}>
                <Button
                    onClick={handleLogin}
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                >
                    {isLoading ? <CircularProgress size={24} /> : "Login"}
                </Button>
                <Button
                    onClick={() => navigate("/register")} // Register sayfasına yönlendirme
                    variant="outlined"
                    color="secondary"
                    fullWidth
                >
                    Register
                </Button>
            </Stack>
        </Box>
    );
};

export default Login;
