import { Router } from "express";
import { EAuth } from "../../enums/EAuth/EAuth";
import AuthController from "../../controllers/auth/authController";
import { authenticateToken } from "../../middlewares/auth/authMiddleware";
import { RateLimiter } from "../../middlewares/limiter/rateLimit.middleware";
export const authRoute = Router();

authRoute.post(`${EAuth.AUTH}/register`, AuthController.register);
authRoute.post(
  `${EAuth.AUTH}/login`,
  RateLimiter.loginLimiter(),
  AuthController.login
);
authRoute.post(`${EAuth.AUTH}/forgot-password`, AuthController.forgotPassword);
authRoute.post(`${EAuth.AUTH}/reset-password`, AuthController.resetPassword);
authRoute.post(
  `${EAuth.AUTH}/change-password`,
  authenticateToken,
  AuthController.changePassword.bind(AuthController)
);
authRoute.get(
  `${EAuth.AUTH}/me`,
  authenticateToken,
  AuthController.getMe.bind(AuthController)
);

authRoute.post(
  `${EAuth.AUTH}/change-password`,
  authenticateToken,
  AuthController.changePassword
);
