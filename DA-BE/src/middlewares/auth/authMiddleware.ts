import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

export const authenticateToken = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied",
    });
  }

  try {
    const decode = jwt.verify(token, secretKey);
    req.user = decode;
    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};
