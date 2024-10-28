import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, Button, Modal, IconButton, Stack, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Book } from "../types/auth";
import axios from "axios";
import AddBook from "./AddBook";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [open, setOpen] = useState(false);
    const [editBook, setEditBook] = useState<Book | null>(null); // Güncelleme işlemi için seçilen kitap
    const [statusFilter, setStatusFilter] = useState("Active"); // Varsayılan durum filtresi
    const navigate = useNavigate();

    const fetchBooks = async (status: string) => {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5172/api/books?status=${status}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks(statusFilter);
    }, [statusFilter]);

    const handleOpen = (book?: Book) => {
        setEditBook(book || null);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    const handleDelete = async (bookId: number) => {
        const token = localStorage.getItem("token");
        try {
            // Kitabı "Deleted" olarak güncelleme isteği gönder
            await axios.put(
                `http://localhost:5172/api/books/${bookId}/status`,
                "Deleted",
                {
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            fetchBooks(statusFilter); // Silme işleminden sonra mevcut duruma göre listeyi yenile
        } catch (error) {
            console.error("Error updating book status to 'Deleted':", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Token'ı silerek oturumu kapat
        navigate("/"); // Giriş sayfasına yönlendir
    };

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h4">Books</Typography>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <FormControl>
                    <InputLabel>Status Filter</InputLabel>
                    <Select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        label="Status Filter"
                    >
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Passive">Passive</MenuItem>
                        <MenuItem value="Deleted">Deleted</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={() => handleOpen()}>
                    Add Book
                </Button>
            </Stack>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <AddBook onBookAdded={() => fetchBooks(statusFilter)} onClose={handleClose} book={editBook} />
                </Box>
            </Modal>
            <List>
                {books.map((book) => (
                    <ListItem
                        key={book.id}
                        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                        <Typography>
                            {book.title} - {book.author} ({book.status})
                        </Typography>
                        <Box>
                            <IconButton onClick={() => handleOpen(book)} color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDelete(book.id)} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default BookList;
