import { Router } from "express";
import { EAdmin } from "../../enums/EAdmin/EAdmin";
import { AdminUserController }  from "../../controllers/admin/adminController";

export const adminRoute = Router();

adminRoute.get(EAdmin.FETCH_USERS, AdminUserController.fetchAllUsers);