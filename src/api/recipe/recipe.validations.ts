import { validateRequest } from '@/lib/middlewares/middlewares';
import { RecipeAndIngredients } from '@/lib/schemas/schemas';

export const validateCreateRecipeBody = validateRequest({
  body: RecipeAndIngredients,
});
