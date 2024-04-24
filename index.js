import express from "express";
import cors from "cors";
import { connectToDb } from "./db.js";
import dotenv from "dotenv";
import { router } from "./routes/index.js";
dotenv.config();
const app = express();
app.use(cors());

app.use("/api/v1", router);
app.use(express.json());

connectToDb()
  .then(() => {
    console.log("db connected");
    app.listen(3000, () => console.log("server started"));
  })
  .catch((err) => console.log(err));
