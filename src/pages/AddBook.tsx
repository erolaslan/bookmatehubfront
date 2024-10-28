import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import axios from "axios";

interface AddBookProps {
    onBookAdded: () => void;
    onClose: () => void;
    book?: Book; // Güncelleme için kitap bilgisi (isteğe bağlı)
}

const AddBook: React.FC<AddBookProps> = ({ onBookAdded, onClose, book }) => {
    const [title, setTitle] = useState(book?.title || "");
    const [author, setAuthor] = useState(book?.author || "");
    const [status, setStatus] = useState(book?.status || "Active");

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setStatus(book.status); // Gelen kitabın durumunu ayarla
        }
    }, [book]);

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        try {
            if (book) {
                // Kitap güncelleme işlemi
                await axios.put(
                    `http://localhost:5172/api/books/${book.id}`,
                    { title, author, status },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } else {
                // Yeni kitap ekleme işlemi
                await axios.post(
                    "http://localhost:5172/api/books",
                    { title, author, status },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            }
            onBookAdded(); // Listeyi güncelle
            onClose(); // Modal'ı kapat
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    return (
        <Box>
            <Typography variant="h6">{book ? "Edit Book" : "Add Book"}</Typography>
            <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                >
                    <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="Passive">Passive</MenuItem>
                    <MenuItem value="Deleted">Deleted</MenuItem>
                </Select>
            </FormControl>
            <Button onClick={handleSave} variant="contained" color="primary" fullWidth>
                {book ? "Update Book" : "Add Book"}
            </Button>
        </Box>
    );
};

export default AddBook;
