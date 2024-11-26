import router from 'express';
import { AdminCategoryController } from '../../controllers/admin/adminController';
import { EAdmin } from '../../enums/EAdmin/EAdmin';

const categoryRouter = router();

categoryRouter.get(`${EAdmin.FETCH_CATEGORIES}`, AdminCategoryController.fetchAllCategories);
categoryRouter.get(`${EAdmin.FETCH_CATEGORY}`, AdminCategoryController.fetchCategory);
categoryRouter.post(`${EAdmin.CREATE_CATEGORY}`, AdminCategoryController.createCategory);
categoryRouter.put(`${EAdmin.UPDATE_CATEGORY}`, AdminCategoryController.updateCategory);
categoryRouter.delete(`${EAdmin.DELETE_CATEGORY}`, AdminCategoryController.deleteCategory);