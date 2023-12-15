import express  from "express";
import { createUrl, getURLs } from "../controllers/urlControllers.js";
import validateToken from "../middlewares/validateToken.js";
const Router=express.Router();

Router.use(validateToken);
Router.get("/",getURLs)
      .post("/",createUrl)

export default Router;