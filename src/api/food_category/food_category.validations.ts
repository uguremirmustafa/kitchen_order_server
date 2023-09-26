import { validateRequest } from '@/lib/middlewares/middlewares';
import { ID } from '@/lib/schemas/schemas';

export const validateFoodCategoryParams = validateRequest({
  params: ID,
});
