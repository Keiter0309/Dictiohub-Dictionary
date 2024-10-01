import { Router } from "express";
import { EAdmin } from "../../enums/EAdmin/EAdmin";
import { AdminUserController, AdminAuthController }  from "../../controllers/admin/adminController";
import { authenticateToken, verifyAdmin } from "../../middlewares/auth/authMiddleware";

export const adminRoute = Router();

adminRoute.get(EAdmin.FETCH_USERS, verifyAdmin, authenticateToken, AdminUserController.fetchAllUsers);
adminRoute.post(EAdmin.LOGIN, AdminAuthController.login);
