import express from "express";
import { userrouter } from "./user.js";
import { authMiddleware } from "../middleware.js";

const router = express.Router();

router.use("/user", authMiddleware);
export { router };
