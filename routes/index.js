import express from "express";
import { userrouter } from "./user.js";

const router = express.Router();

router.use("/user", userrouter);
export { router };
