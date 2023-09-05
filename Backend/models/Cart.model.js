const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, 
      quantity: Number, 
    }
  ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
