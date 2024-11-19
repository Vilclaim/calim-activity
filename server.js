const express = require("express"); 
const app = express();
require("dotenv").config(); 

app.use(express.json()); 

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); 


let books = [
  { id: 1, title: "1984", author: "George Orwell" },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
];

app.post("/books", (req, res) => {
  const { title, author } = req.body; 
  const newBook = { id: books.length + 1, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/books", (req, res) => {
  res.json(books);
});


app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); 
  if (!book) return res.status(404).json({ message: "Book not found" }); 
  res.json(book); 
});


app.put("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id)); 
  if (!book) return res.status(404).json({ message: "Book not found" }); 
  const { title, author } = req.body; 
  book.title = title;
  book.author = author;
  res.json(book);
});


app.delete("/books/:id", (req, res) => {
  const index = books.findIndex((b) => b.id === parseInt(req.params.id)); 
  if (index === -1) return res.status(404).json({ message: "Book not found" }); 
  books.splice(index, 1); 
  res.status(204).send(); 
});