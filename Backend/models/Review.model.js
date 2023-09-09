const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true },
  comment: String,
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = {Review};