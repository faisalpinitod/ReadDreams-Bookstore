const express = require("express")
const {User} = require("../models/User.model")
const { authenticate } = require("../middleware/authentication.middleware")

const profileRouter=express.Router()


profileRouter.get("/userprofile",authenticate,async(req,res)=>{
    try{
        const user=req.user
        const profile=await User.find(user)
        res.status(200).json(profile)   
    }catch(err){
        res.status(500).json({error:"Internal server error"})
    }
})


module.exports={
    profileRouter
}
