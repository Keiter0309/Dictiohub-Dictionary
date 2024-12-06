import { AdminCategoryService } from '../../services/admin/adminServices';

let lastUpdatedTime: Date | null = null;

export const fetchLastUpdatedTime = async (): Promise<Date | null> => {
  try {
    lastUpdatedTime = await AdminCategoryService.lastTimeCategoryUpdated();
    return lastUpdatedTime;
  } catch (err) {
    console.error('Error fetching last updated time:', err);
    return null;
  }
};
