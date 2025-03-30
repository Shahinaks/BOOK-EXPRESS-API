const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
    { id: 3, title: "1984", author: "George Orwell", year: 1949 }
];

// Get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Get a single book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
});

// Add a new book
app.post('/books', (req, res) => {
    const { title, author, year } = req.body;

    // Validate input (Ensure all fields are provided)
    if (!title || !author || !year) {
        return res.status(400).json({ message: "All fields (title, author, year) are required!" });
    }

    const newBook = { id: books.length + 1, title, author, year };
    books.push(newBook);
    res.status(201).json(newBook);
});


// Update a book by ID
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Book not found" });

    const { title, author, year } = req.body;
    book.title = title || book.title;
    book.author = author || book.author;
    book.year = year || book.year;

    res.json(book);
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex === -1) return res.status(404).json({ message: "Book not found" });
    
    books.splice(bookIndex, 1);
    res.json({ message: "Book deleted successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
