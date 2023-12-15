import { nanoid } from "nanoid";
import url from "../models/urlModel.js";
import asycnHandler from "express-async-handler";

//@desc Get all urls
//@route GET /api/urls
//@access private
const getURLs=asycnHandler(async(req,res)=>{
    const urls=await url.find({user_id:req.user.id})
    res.status(200).json(urls);
})

//@desc create a url
//@route POST /api/urls/
//@access private
const createUrl=asycnHandler(async(req,res)=>{
    const redirectURL=req.body.url;
    const user_id=req.user.id
    const shortId=nanoid(8);
    await url.create({user_id,shortId,redirectURL});

    res.status(201).json({id:shortId});
})

export {createUrl,getURLs};