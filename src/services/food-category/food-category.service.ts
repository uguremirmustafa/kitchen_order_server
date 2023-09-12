import db from '@db/db';
import { FoodCategory } from '@models/food_category';

export async function getAll() {
  const data = await getCategories();
  return data ?? [];
}

export async function getCategories() {
  return db
    .select({ id: 'id', name: 'name', image: 'image' })
    .from<FoodCategory>('food_category')
    .orderBy('id', 'asc');
}
