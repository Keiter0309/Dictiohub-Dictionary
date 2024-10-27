import { Router } from "express";
import { EAdmin } from "../../enums/EAdmin/EAdmin";
import { AdminUserController, AdminAuthController, AdminWordController }  from "../../controllers/admin/adminController";
import { authenticateToken, verifyAdmin } from "../../middlewares/auth/authMiddleware";
import { EWords } from "../../enums/EWords/EWords";

export const adminRoute = Router();

// Admin & User management routes
adminRoute.post(EAdmin.LOGIN, AdminAuthController.login);
adminRoute.get(EAdmin.FETCH_USER, AdminUserController.fetchUserByEmail);
adminRoute.put(EAdmin.UPDATE_USER, AdminUserController.updateUser);
adminRoute.post(EAdmin.CREATE_USER, AdminUserController.createUser);
adminRoute.delete(EAdmin.DELETE_USER, AdminUserController.deleteUser);
adminRoute.get(EAdmin.FETCH_USERS, authenticateToken, AdminUserController.fetchAllUsers);

// Word management routes
adminRoute.get(EAdmin.FETCH_WORD, AdminWordController.fetchWord);
adminRoute.get(EAdmin.FETCH_WORDS, AdminWordController.fetchAllWords);
adminRoute.post(EAdmin.CREATE_WORD, AdminWordController.createWord)
adminRoute.delete(EAdmin.DELETE_WORD, AdminWordController.deleteWord);
adminRoute.put(EAdmin.UPDATE_WORD, AdminWordController.updateWord);