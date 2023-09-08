const express = require("express")
const { Book } = require("../models/Book.model")


const bookRouter=express.Router();


bookRouter.get("/getbook",async(req,res)=>{
    try{
        const book=await Book.find()
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})


bookRouter.get("/getbook/:id",async(req,res)=>{
    const id=req.params.id
    try{
        const book=await Book.findById(id)
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports={
    bookRouter
}