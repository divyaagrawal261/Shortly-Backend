import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is successfully connected...");
    }
    catch(err)
    {
        console.log(err);
        console.log("Database could not be connected...");
        console.log("Terminating the server...");
        process.exit(1);
    }
}

export default connectDb;