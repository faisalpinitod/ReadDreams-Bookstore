const express=require("express")
const { User }=require("../models/User.model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const { addToBlacklist } = require("../blacklist")
require("dotenv").config()
const userRouter=express.Router()

const secretKey=process.env.jwt_Secret_key
const tokenExpire=process.env.tokenExpiration



userRouter.post('/register',async(req,res)=>{
    const {username,email,password,role,profile:{name,profilepicture,gender}}=req.body
    try{
        const existingUser= await User.findOne({email})
        if(existingUser){
            return res.status(400).json({Message:"User alreadu exists!"})
        }
        const hashedPass=await bcrypt.hash(password,10);
        const user=new User({username,email,password:hashedPass,roles:[role],profile:{name,profilepicture,gender}})
        await user.save()
        res.status(201).json({Message:"User Registerd Successfully!"})

    }catch(err){
        res.status(500).json({Message:"Internal server error!"})
    }
})


userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Inavlid email or password!"})
        }
        const pass=bcrypt.compare(password,user.password)
        if(!pass){
            return res.status(400).json({error:"Inavlid email or password!"})
        }
        const payloadToken={
            id:user._id,
            email:user.email,
            roles:user.role
        }
        const authToken=jwt.sign(payloadToken,secretKey,{expiresIn:tokenExpire})
        res.status(200).json({Message:"Login Successful",authToken})


    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})


userRouter.post("/logout",async(req,res)=>{
    try{
        const token=req.headers.authorization
        if(!token){
            return res.status(401).json({ message: 'Authentication required' });
        }
        addToBlacklist(token)
        res.status(201).json({Message:"Logout Successful"})
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports={
    userRouter
}



