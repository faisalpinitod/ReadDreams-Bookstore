const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  items: [
    {
      bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true }, 
      quantity: { type: Number, required: true }, 
      price: { type: Number, required: true }, 
    },
  ],
  totalAmount: { type: Number, required: true }, 
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    default: 'pending',
    required: true,
  },
  createdAt: { type: Date, default: Date.now }, 
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {Order};
