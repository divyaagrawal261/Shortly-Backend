import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//@desc Create a new user
//@route POST /api/user/register
//@access public
const createUser=asyncHandler(async(req,res)=>{
    const {username, email, password}=req.body

    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }

    //hash Password
    const hashedPassword=await bcrypt.hash(password,10);
    
    const user=await User.create({username, email, password:hashedPassword});

    if(user)
    {
        res.status(201).json({_id:user.id,email:user.email});
    }
    else
    {
        res.status(400);
        throw new Error("User data is not valid");
    }
   res.json({message:"Register the user"});
});

//@desc Login user
//@route POST /api/user/login
//@access public 
const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const user=await User.findOne({email});

    if(user && (await bcrypt.compare(password,user.password)))
    {
        const accessToken=jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"});
        console.log(accessToken);
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("Email or Password does not match");
    }
 });

//@desc Current user info
//@route GET /api/user/current
//@access private 
const currentUser=asyncHandler(async(req,res)=>{
    res.json(req.user);
 });


export {createUser,loginUser,currentUser}  