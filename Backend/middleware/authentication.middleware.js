const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticate=(req,res,next)=>{
        const token=req.headers.authorization;
        if(!token){
            return res.status(401).json({message:"Authentication required!"})
        }

        jwt.verify(token,process.env.jwt_Secret_key,(err,decoded)=>{
            if(err){
                return res.status(401).json({error:"Invalid token"})
            }
            req.id=user
            next()
        })
}


const requireRole=(role)=>{
    return (req,res,next)=>{
        if(!req.user.roles.includes(role)){
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' })
        }
        next()
    }
}


module.exports = {
    authenticate,
    requireRole
}