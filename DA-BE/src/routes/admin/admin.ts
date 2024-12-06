import { Router } from "express";
import { EAdmin } from "../../enums/EAdmin/EAdmin";
import {
  AdminUserController,
  AdminAuthController,
  AdminWordController,
  AdminCategoryController,
} from "../../controllers/admin/adminController";
import {
  authenticateToken,
  verifyAdmin,
} from "../../middlewares/auth/authMiddleware";
import { EWords } from "../../enums/EWords/EWords";

export const adminRoute = Router();

// Admin & User management routes
adminRoute.post(EAdmin.LOGIN, AdminAuthController.login);
adminRoute.post(EAdmin.CREATE_USER, AdminUserController.createUser);
adminRoute.put(EAdmin.UPDATE_USER, AdminUserController.updateUser);
adminRoute.delete(EAdmin.DELETE_USER, AdminUserController.deleteUser);
adminRoute.get(EAdmin.FETCH_USER, AdminUserController.fetchUserByEmail);
adminRoute.get(
  EAdmin.FETCH_USERS,
  authenticateToken,
  AdminUserController.fetchAllUsers
);
adminRoute.get(
  EAdmin.FETCH_USER_BY_ID,
  authenticateToken,
  AdminUserController.fetchUser
);

// Word management routes
adminRoute.get(EAdmin.FETCH_WORD, AdminWordController.fetchWord);
adminRoute.put(EAdmin.UPDATE_WORD, AdminWordController.updateWord);
adminRoute.post(EAdmin.CREATE_WORD, AdminWordController.createWord);
adminRoute.delete(EAdmin.DELETE_WORD, AdminWordController.deleteWord);
adminRoute.get(
  EAdmin.FETCH_WORDS,
  // authenticateToken,
  AdminWordController.fetchAllWords
);

// Category management routes
adminRoute.get(
  EAdmin.FETCH_CATEGORIES,
  // authenticateToken,
  AdminCategoryController.fetchAllCategories
);

adminRoute.get(EAdmin.FETCH_CATEGORY, AdminCategoryController.fetchCategory);
adminRoute.get(
  `${EAdmin.FETCH_CATEGORY}`,
  AdminCategoryController.fetchCategory
);
adminRoute.post(
  `${EAdmin.CREATE_CATEGORY}`,
  authenticateToken,
  AdminCategoryController.createCategory
);
adminRoute.put(
  `${EAdmin.UPDATE_CATEGORY}`,
  authenticateToken,
  AdminCategoryController.updateCategory
);
adminRoute.delete(
  `${EAdmin.DELETE_CATEGORY}`,
  AdminCategoryController.deleteCategory
);
