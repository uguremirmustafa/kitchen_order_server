import db from '@db/db';
import { Brand } from '@models/brand';
import { FoodCategory } from '@models/food_category';
import { Ingredient } from '@models/ingredient';

export async function getAll() {
  const brands = await getIngredientsWithBrandName();
  return brands ?? [];
}

export async function getCategoryItems(id: FoodCategory['id']) {
  const data = await getIngredientsUnderCategory(id);
  return data ?? [];
}

export async function getIngredientNames() {
  return db.select({ id: 'id', name: 'name' }).from<Ingredient>('ingredient').orderBy('id', 'desc');
}

export type IngredientWithBrandName = {
  ingredientId: Ingredient['id'];
  ingredientName: Ingredient['name'];
  brandName: Brand['name'];
  brandId: Brand['id'];
};

export async function getIngredientsWithBrandName(): Promise<IngredientWithBrandName[]> {
  return db('ingredient')
    .innerJoin('brand', 'brand.id', 'ingredient.brand_id')
    .select(
      'ingredient.id as ingredientId',
      'ingredient.name as ingredientName',
      'brand.name as brandName',
      'brand.id as brandId'
    )
    .orderBy('ingredient.id', 'desc');
}
export async function getIngredientsUnderCategory(
  food_category_id: FoodCategory['id']
): Promise<IngredientWithBrandName[]> {
  return db('ingredient')
    .innerJoin('brand', 'brand.id', 'ingredient.brand_id')
    .innerJoin('food_category', 'food_category.id', 'ingredient.food_category_id')
    .select(
      'ingredient.id as ingredientId',
      'ingredient.name as ingredientName',
      'brand.name as brandName',
      'brand.id as brandId',
      'food_category.name as categoryName',
      'food_category.id as categoryId',
      'ingredient.image as image'
    )
    .where('ingredient.food_category_id', food_category_id)
    .orderBy('ingredient.id', 'desc');
}

export async function createOne(data: Partial<Omit<Ingredient, 'id'>>): Promise<Ingredient | null> {
  try {
    const res = await db
      .insert({
        brand_id: data.brand_id,
        name: data.name,
        description: data.description,
        food_category_id: data.food_category_id,
        image: data.image,
      })
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
      .update({
        brand_id: data.brand_id,
        name: data.name,
        description: data.description,
        food_category_id: data.food_category_id,
        image: data.image,
      })
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
