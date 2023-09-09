const express= require("express")
const { Order } = require("../models/Order.model")
const { Cart } = require("../models/Cart.model")
const {authenticate} = require("../middleware/authentication.middleware")

const orderRouter = express.Router()

orderRouter.post("/place",authenticate,async(req,res)=>{
    try{
        const user=req.user
        const userCart=await Cart.findOne({user})
        if(!userCart || userCart.items.length===0){
            return res.status(400).json({message:"Cart is empty!"})
        }
        const orderItems=userCart.items.map((cartItem)=>({
            book:cartItem.book,
            quantity:cartItem.quantity,
            price:cartItem.price
        }))
        const totalAmount=userCart.totalAmount
        const newOrder=new Order({
            user,
            items:orderItems,
            totalAmount
        })
        await newOrder.save()
        userCart.items=[]
        userCart.totalAmount=0;
        await userCart.save()
        res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

orderRouter.get("/history",authenticate,async(req,res)=>{
    try{
        const user=req.user
        const orderHistory = await Order.find({user})
        res.status(200).json(orderHistory)
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})


orderRouter.get("/view/:id",authenticate,async(req,res)=>{
    try{
        const user=req.user 
        const id=req.params.id
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
        const order = await Order.findOne({_id:id,userId:user}) 
        res.status(200).json(order)
    }catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
})

orderRouter.delete("/delete/:id",authenticate,async(req,res)=>{
    try{
        const id=req.params.id
        const user=req.user
        const order = await Order.findOne({_id:id,userId:user})
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
          }
        if(order.status==="delivered"){
            return res.status(400).json({ message: 'Cannot cancel a delivered order' });
        }
        order.status = 'canceled';
        await order.save();
        res.status(200).json({ message: 'Order canceled successfully', order });

    }catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})