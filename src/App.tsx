import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";

const App: React.FC = () => (
    <BrowserRouter>
        <Routes>
            {/* /api yollarını yok sayacak şekilde yönlendirin */}
            <Route path="/api/*" element={null} />

            {/* Diğer rotalar */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/books" element={<BookList />} />
            <Route 
                path="/books/create" 
                element={<AddBook onBookAdded={() => {}} onClose={() => {}} />} 
            />
        </Routes>
    </BrowserRouter>
);

export default App;
