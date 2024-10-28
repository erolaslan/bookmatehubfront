import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { UserRegister } from "../types/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [formData, setFormData] = useState<UserRegister>({ username: "", password: "" });
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await axios.post("http://localhost:5172/api/auth/register", {
                username: formData.username,
                passwordHash: formData.password, // Sunucu şifreyi 'passwordHash' alanında bekliyorsa
            });
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };

    return (
        <Box>
            <Typography variant="h4">Register</Typography>
            <TextField
                label="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <TextField
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <Button onClick={handleRegister}>Register</Button>
        </Box>
    );
};

export default Register;
