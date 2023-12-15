import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:[true, "Email already taken"],
        required:[true, "Please enter an email"]
    },
    password:{
        type:String,
        required:[true, "Please provide a password"]
    }
})

const User = mongoose.model("User",userSchema);

export default User;