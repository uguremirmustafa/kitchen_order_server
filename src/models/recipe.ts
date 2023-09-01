import { Ingredient } from './ingredient';
import { Unit } from './unit';

export type Recipe = {
  id: number;
  name: string;
  description?: string;
};

export type RecipeIngredient = {
  id: number;
  recipe_id: Recipe['id'];
  ingredient_id: Ingredient['id'];
  amount: number;
  unit_id: Unit['id'];
};
