import express from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { JWT_SECRET } from "../config.js";

const userrouter = express.Router();

const signUpSchema = zod.object({
  userName: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

userrouter.post("/signup", async (req, res) => {
  try {
    const body = req.body;
    const { success } = signUpSchema.safeParse(body);
    if (!success)
      return res
        .status(401)
        .json({ message: "Email already taken/ incorrect email" });

    const user = await User.findOne({
      userName: body.userName,
    });

    if (user) {
      return res
        .status(403)
        .json({ message: "Email already taken / incorrect email" });
    }

    const userr = await User.create(body);
    const token = jwt.sign({ userId: userr._id }, JWT_SECRET);
    res.status(200).json({
      message: "user created",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating user", error: error.message });
  }
});

export { userrouter };
