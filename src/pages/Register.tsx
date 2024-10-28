import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { UserRegister } from "../types/auth";
import apiClient from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [formData, setFormData] = useState<UserRegister>({ username: "", password: "" });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setErrorMessage(null); // Hata mesajını sıfırla
        try {
            await apiClient.post("/auth/register", {
                username: formData.username,
                passwordHash: formData.password, // Sunucu şifreyi 'passwordHash' alanında bekliyorsa
            });
            navigate("/"); // Kayıt başarılı olduğunda giriş sayfasına yönlendirin
        } catch (error) {
            setErrorMessage("Registration failed. Please try again.");
            console.error("Registration failed:", error);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Register
            </Typography>
            {errorMessage && (
                <Typography color="error" gutterBottom>
                    {errorMessage}
                </Typography>
            )}
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
            <Button onClick={handleRegister} variant="contained" color="primary" fullWidth>
                Register
            </Button>
        </Box>
    );
};

export default Register;
