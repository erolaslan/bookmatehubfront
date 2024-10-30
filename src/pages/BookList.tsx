import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal,
  IconButton,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Book } from "../types/auth";
import apiClient from "../utils/axiosInstance";
import AddBook from "./AddBook";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [open, setOpen] = useState(false);
  const [editBook, setEditBook] = useState<Book | undefined>();
  const [statusFilter, setStatusFilter] = useState("Active");
  const navigate = useNavigate();

  const fetchBooks = async (status: string) => {
    try {
      const response = await apiClient.get(`/books?status=${status}`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      if ((error as any).response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchBooks(statusFilter);
  }, [statusFilter]);

  const handleOpen = (book?: Book) => {
    setEditBook(book);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBook(undefined);
  };

  const handleDelete = async (bookId: number) => {
    try {
      const response = await apiClient.get(`/Books/delete?id=${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 204 || response.status === 200) {
        fetchBooks(statusFilter);
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.error(
        "Error updating book status to 'Deleted':",
        error.response?.data || error.message
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Books</Typography>
        <Button variant="outlined" color="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FormControl sx={{ minWidth: 150 }}>
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          sx={{ ml: "auto" }}
        >
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
          <AddBook
            onBookAdded={() => fetchBooks(statusFilter)}
            onClose={handleClose}
            book={editBook}
          />
        </Box>
      </Modal>
      <Stack direction="row" flexWrap="wrap" spacing={2} justifyContent="start">
        {books.map((book) => (
          <Card
            key={book.id}
            sx={{
              width: 300,
              minHeight: 200,
              mb: 2,
              mr: 2,
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              border: "1px solid #ccc",
            }}
          >
            <CardContent>
              <Typography variant="h6" color="primary">
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                by {book.author}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`Status: ${book.status}`}
              </Typography>
              {book.readingDate && (
                <Typography variant="body2" color="text.secondary">
                  {`Reading Date: ${dayjs(book.readingDate).format(
                    "YYYY-MM-DD"
                  )}`}
                </Typography>
              )}
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleOpen(book)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(book.id)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default BookList;
