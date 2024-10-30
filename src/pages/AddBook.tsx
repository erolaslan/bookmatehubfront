import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import apiClient from "../utils/axiosInstance";
import dayjs from "dayjs"; // Tarih formatlamak için

interface Book {
  id?: number;
  title: string;
  author: string;
  readingDate?: string; // Yeni tarih alanı
  status: string;
}

interface AddBookProps {
  onBookAdded: () => void;
  onClose: () => void;
  book?: Book; // Güncelleme için kitap bilgisi (isteğe bağlı)
}

const AddBook: React.FC<AddBookProps> = ({ onBookAdded, onClose, book }) => {
  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [readingDate, setReadingDate] = useState(
    book?.readingDate ? dayjs(book.readingDate).format("YYYY-MM-DD") : "" // Tarihi formatla
  );
  const [status, setStatus] = useState(book?.status || "Active");

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setReadingDate(
        book.readingDate ? dayjs(book.readingDate).format("YYYY-MM-DD") : ""
      );
      setStatus(book.status);
    }
  }, [book]);

  const handleSave = async () => {
    try {
      const formattedReadingDate = readingDate ? dayjs(readingDate).toISOString() : undefined;
      const bookData = {
        title,
        author,
        status,
        readingDate: formattedReadingDate,
      };

      if (book) {
        await apiClient.put(`/books/${book.id}`, bookData);
      } else {
        await apiClient.post("/books", bookData);
      }
      onBookAdded();
      onClose();
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
      <TextField
        label="Reading Date"
        type="date"
        value={readingDate}
        onChange={(e) => setReadingDate(e.target.value)}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      {book ? 
      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          label="Status"
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Passive">Passive</MenuItem>
        </Select>
      </FormControl> :null}
      
      <Button
        onClick={handleSave}
        variant="contained"
        color="primary"
        fullWidth
      >
        {book ? "Update Book" : "Add Book"}
      </Button>
    </Box>
  );
};

export default AddBook;
