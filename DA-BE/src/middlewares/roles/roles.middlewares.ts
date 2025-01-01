import { Request, Response, NextFunction } from "express";
import { roles } from "../../role";
import { JwtPayload } from "../../interface/JwtPayload";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Load .env
dotenv.config();
const secretKey = process.env.JWT_SECRET as string;

// Extend the Request interface to include the user property
interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const checkPermission = (requiredPermission: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    try {
      const token = req.cookies?.token || req.cookies?.aToken;

      if (!token) {
        res.status(403).json({ message: "Invalid Credentials" });
        return;
      }

      try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        req.user = decoded;
      } catch (err) {
        res.status(403).json({ message: "Invalid Credentials" });
        return;
      }

      try {
        const userRole = req.user?.role;
        if (!userRole) {
          res.status(403).json({ message: "Role not found" });
          return;
        }

        const userPermission = roles[userRole];
        const hasPermission = requiredPermission.every((permission) => {
          return userPermission.includes(permission);
        });

        if (!hasPermission) {
          res.status(403).json({ message: "Access Denied" });
          return;
        }

        next();
      } catch (err) {
        res.status(403).json({ message: "Invalid Credentials" });
        return;
      }
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  };
};
