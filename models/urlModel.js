import e from "express";
import mongoose from "mongoose";

const urlSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"Please provide a user ID"]
    },
    shortId:{
        type:String
    },
    redirectURL:{
        type:String,
        required:[true, "Please provide a URL"]
    },
    clicks:{
        type:Number,
        default:0
    }
});

const url=mongoose.model("url",urlSchema);

export default url;