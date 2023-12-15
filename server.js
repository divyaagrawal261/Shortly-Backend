import express from "express";
import connectDb from "./config/dbConnect.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app=express();
const port=process.env.PORT;
connectDb();

app.use(express.json());
app.use("/api/users",userRoutes);
app.listen(port,()=>{
    console.log(`Server is listening at port ${port}`);
})