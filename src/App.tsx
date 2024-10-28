import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";

const App: React.FC = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        
        {/* AddBook bileşeni için gerekli propsları ekleyin */}
        <Route 
            path="/books/create" 
            element={<AddBook onBookAdded={() => {}} onClose={() => {}} />} 
        />
    </Routes>
);

export default App;
