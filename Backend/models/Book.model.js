const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  price: Number,
  description: String,
  image:String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = {
    Book
}
