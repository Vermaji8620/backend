import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json(401).json({ message: "invalid" });
    }

    const token = authHeader.split(" ")[1];
    const verify = jwt.verify(token, JWT_SECRET);
    if (verify.userId) {
      req.userId = verify.userId;
      next();
    } else {
      res
        .status(500)
        .json({ message: "error in middleware", error: error.message });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "error in middleware", error: error.message });
  }
};
