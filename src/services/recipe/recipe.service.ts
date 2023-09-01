import db from '@db/db';
import { Brand } from '@models/brand';
import { Ingredient } from '@models/ingredient';
import { Recipe } from '@models/recipe';

export async function getAll() {
  const items = await getRecipes();
  return items ?? [];
}
export async function getOne(id: Recipe['id']) {
  const item = await getRecipeById(id);
  return item;
}

export async function getRecipes() {
  return db<Recipe>('recipe').select('*');
}

export async function getRecipeById(id: Recipe['id']) {
  return db<Recipe>('recipe')
    .select('recipe.id', 'recipe.name', 'recipe.description')
    .where('recipe.id', id)
    .first();
}

export type IngredientWithBrandName = {
  ingredientId: Ingredient['id'];
  ingredientName: Ingredient['name'];
  brandName: Brand['name'];
};

export async function createOne(data: Partial<Omit<Ingredient, 'id'>>): Promise<Ingredient | null> {
  try {
    const res = await db
      .insert({ brand_id: data.brand_id, name: data.name, description: data.description })
      .into('ingredient')
      .returning('*');

    if (res.length && res.length === 1) {
      return res[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOne(
  data: Partial<Ingredient>,
  id: Ingredient['id']
): Promise<Ingredient | null> {
  try {
    const res = await db
      .update({ brand_id: data.brand_id, name: data.name, description: data.description })
      .into('ingredient')
      .where({ id })
      .returning('*');

    if (res.length && res.length === 1) {
      return res[0];
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteOne(id: Ingredient['id']): Promise<boolean> {
  try {
    const res = await db('ingredient').delete().where({ id });

    if (res === 1) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
