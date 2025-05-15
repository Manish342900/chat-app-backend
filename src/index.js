import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./lib/db.js"
import cookieParser from "cookie-parser"
 

dotenv.config()
const app=express()

const PORT=process.env.PORT

app.use(express.json())  
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));


app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT)
    connectDB()
});