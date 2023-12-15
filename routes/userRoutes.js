import express  from "express";
import { createUser, currentUser, loginUser } from "../controllers/userControllers.js";
import validateToken from "../middlewares/validateToken.js";
const Router=express.Router();

Router.get("/current",validateToken,currentUser)
      .post("/register",createUser)
      .post("/login",loginUser)

export default Router;