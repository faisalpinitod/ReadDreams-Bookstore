const express= require("express")
const { Cart } = require("../models/Cart.model")
const { authenticate } = require("../middleware/authentication.middleware")
const { Book } = require("../models/Book.model")

const cartRouter = express.Router()


cartRouter.post("/add/:id", authenticate, async (req, res) => {
    try {
      const user = req.user;
      const id = req.params.id;
  
      const book = await Book.findById(id);
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }

      const userCart = await Cart.findOne({ userId: user });
      if (!userCart) {
        const newCart = new Cart({
          userId: user,
          items: [
            {
              book: book._id, 
              quantity: 1,
              price: book.price, 
            },
          ],
          totalAmount: book.price, 
        });
  
        await newCart.save();
        return res.status(200).json({ message: 'Book added to cart', cart: newCart });
      }
  
      const existingCartItem = userCart.items.find((item) => item.book.equals(book._id));
  
      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        userCart.items.push({
          book: book._id, 
          quantity: 1,
          price: book.price, 
        });
      }
  
      userCart.totalAmount = userCart.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      await userCart.save();
      res.status(200).json({ message: 'Book added to cart', cart: userCart });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  


cartRouter.get("/getcart",authenticate,async(req,res)=>{
    try{
        const cart = await Cart.find();
        res.status(201).json(cart)
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})

cartRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    try{
        id=req.params.id;
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).json({ message: 'Book not found' });
        }
        await Cart.findByIdAndDelete(id)
        res.status(204).json({message:"Book deleted successfully"})
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})


cartRouter.delete('/clear', authenticate, async (req, res) => {
  try {
    const userId = req.user; 
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    userCart.items = [];
    await userCart.save();
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = {
    cartRouter
}
