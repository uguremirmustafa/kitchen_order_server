import { NextFunction, Request, Response } from 'express';
import { FoodCategory } from '@/lib/types';
import { getFoodCategories } from './food_category.service';

export async function getAll(req: Request, res: Response<FoodCategory[]>, next: NextFunction) {
  try {
    const categories = await getFoodCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
}
