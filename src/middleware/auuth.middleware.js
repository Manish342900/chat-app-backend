import jwt, { decode } from "jsonwebtoken"
import User from "../models/users.model.js"

export const protectroute=async(req,res,next)=>{
    try {
        const token =req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"Unauthorised No-Token "})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"Unauthorised Invalid-Token "})
            
        }

        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message:"User Not found "})

        }
        req.user=user
        next()
    } catch (error) {
        console.log("Error in Protected Route middleware",error.message)
        res.status(500).json({message:"Internal Server Error"})
        
    }
}