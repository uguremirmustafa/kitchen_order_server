import db from '@db/db';
import { Brand } from '@models/brand';
import { Ingredient } from '@models/ingredient';

export async function getAll() {
  const brands = await getIngredientsWithBrandName();
  return brands ?? [];
}

export async function getIngredientNames() {
  return db.select({ id: 'id', name: 'name' }).from<Ingredient>('ingredient');
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
    );
}

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
