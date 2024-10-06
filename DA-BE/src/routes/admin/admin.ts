import { Router } from "express";
import { EAdmin } from "../../enums/EAdmin/EAdmin";
import { AdminUserController, AdminAuthController }  from "../../controllers/admin/adminController";
import { authenticateToken, verifyAdmin } from "../../middlewares/auth/authMiddleware";

export const adminRoute = Router();

adminRoute.get(EAdmin.FETCH_USERS, AdminUserController.fetchAllUsers);
adminRoute.get(EAdmin.FETCH_USER, AdminUserController.fetchUserByEmail);
adminRoute.post(EAdmin.LOGIN, AdminAuthController.login);
adminRoute.post(EAdmin.CREATE_USER, AdminUserController.createUser);
adminRoute.delete(EAdmin.DELETE_USER, AdminUserController.deleteUser);
adminRoute.put(EAdmin.UPDATE_USER, AdminUserController.updateUser);
