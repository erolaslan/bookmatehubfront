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
  Grid,
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
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">Books</Typography>
        <Stack direction="row" spacing={2} alignItems="center">
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
      </Stack>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {book.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  by {book.author}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Status: {book.status}
                </Typography>
                {book.readingDate && (
                  <Typography variant="body2" color="textSecondary">
                    Reading Date: {dayjs(book.readingDate).format("YYYY-MM-DD")}
                  </Typography>
                )}
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleOpen(book)} color="primary">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(book.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;
