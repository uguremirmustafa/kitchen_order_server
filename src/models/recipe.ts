import { Ingredient } from './ingredient';
import { Unit } from './unit';

export type Recipe = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  users_id?: number;
  for_x_person?: number;
  prep_time?: number;
  cooking_time?: number;
};

export type RecipeIngredient = {
  id: number;
  recipe_id: Recipe['id'];
  ingredient_id: Ingredient['id'];
  amount: number;
  unit_id: Unit['id'];
};
