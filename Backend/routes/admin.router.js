
const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware');
const Book = require('../models/book');

const isAdmin = requireRole('admin');


router.post('/books/add', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, author, price, description,image } = req.body;

  
    const newBook = new Book({
      title,
      author,
      price,
      description,
      image,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.put('/books/:id/edit', authenticate, isAdmin, async (req, res) => {
  try {
    const bookId = req.params.id;
    const { title, author, price, description,image } = req.body;


    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $set: { title, author, price, description,image } },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/books/:id/delete', authenticate, isAdmin, async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
