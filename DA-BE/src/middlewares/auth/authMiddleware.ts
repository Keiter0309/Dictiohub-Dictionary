import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// Load environment variables
dotenv.config();

const secretKey = process.env.JWT_SECRET as string;

if (!secretKey) {
  throw new Error("JWT_SECRET is not defined in the environment variables");
}

interface JwtPayload {
  id: string;
  role: string;
}

export const authenticateToken = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(400).json({
      message: "Invalid token",
    });
  }
};

export const verifyAdmin = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized. No user information found.",
    });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Forbidden. Admin access required.",
    });
  }

  next();
};

export const verifyUser = (req: Request & {user?: JwtPayload}, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized. No user information found.",
    });
  }
}