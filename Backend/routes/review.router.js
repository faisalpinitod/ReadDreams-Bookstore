
const express = require('express');
const authenticate = require('../middleware/authenticate');
const Review = require('../models/review');
const Book = require('../models/book');

const reviewRouter=express.Router()

reviewRouter.post('/write', authenticate, async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;
    const userId = req.user._id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const existingReview = await Review.findOne({ bookId, userId });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const newReview = new Review({
      bookId,
      userId,
      rating,
      comment,
    });

    await newReview.save();

    res.status(201).json({ message: 'Review submitted successfully', review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


reviewRouter.get('/:bookId', async (req, res) => {
    try {
      const bookId = req.params.bookId;

      const reviews = await Review.find({ bookId }).populate('userId', 'username'); 
  
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found for this book' });
      }
  
      res.status(200).json({ reviews });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  

module.exports = {reviewRouter};
