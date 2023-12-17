import express from "express";
import connectDb from "./config/dbConnect.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import urlRoutes from "./routes/urlRoutes.js";
import url from "./models/urlModel.js";
import expressAsyncHandler from "express-async-handler";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

connectDb();

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Server Error");
});
app.use(cors())

app.use(express.json());
app.use("/api/url", urlRoutes);
app.use("/api/users", userRoutes);

app.get("/:id",async(req, res) => {
  try {
    const shortId = req.params.id;
    console.log("Received request for shortId:", shortId);
    
    const entry = await url.findOneAndUpdate({ shortId }, { $inc: { clicks: 1 } }, { new: true });
    console.log("Retrieved entry:", entry);
    
    if (entry && entry.redirectURL) {
      console.log("Redirecting to:", entry.redirectURL);
      res.redirect(entry.redirectURL);
    } else {
      console.log("Entry or redirectURL not found.");
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
