import ReqWithUser from '@/lib/interfaces/ReqWithUser';
import { ID, RecipeAndIngredients, RecipeWithId } from '@/lib/types';
import { NextFunction, Request, Response } from 'express';
import { createRecipe, deleteRecipe, getRecipesOfUser, updateRecipe } from './recipe.service';
import { BoolResponse } from '@/lib/interfaces/BoolResponse';

export async function getAllForUser(
  _req: Request,
  res: Response<RecipeWithId[]>,
  next: NextFunction
) {
  try {
    const req = _req as unknown as ReqWithUser;
    const recipesOfUser = await getRecipesOfUser(req.user.id);
    res.json(recipesOfUser);
  } catch (error) {
    next(error);
  }
}

export async function createOne(
  _req: Request,
  res: Response<RecipeWithId['id']>,
  next: NextFunction
) {
  try {
    const req = _req as unknown as ReqWithUser<{}, {}, RecipeAndIngredients>;
    const newRecipeId = await createRecipe(req.body, req.user.id);
    res.json(newRecipeId);
  } catch (error) {
    next(error);
  }
}

export async function updateOne(
  _req: Request,
  res: Response<RecipeWithId['id']>,
  next: NextFunction
) {
  try {
    const req = _req as unknown as Request<ID, {}, RecipeAndIngredients>;
    const newRecipeId = await updateRecipe(req.params.id, req.body);
    res.json(newRecipeId);
  } catch (error) {
    next(error);
  }
}

export async function deleteOne(_req: Request, res: Response<BoolResponse>, next: NextFunction) {
  try {
    const req = _req as unknown as Request<ID>;
    const isSuccess = await deleteRecipe(req.params.id);
    res.json({ success: isSuccess });
  } catch (error) {
    next(error);
  }
}
