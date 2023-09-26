import db from '@/db/db';
import { FoodCategory } from '@/lib/types';

export async function getFoodCategories() {
  return db.select('*').from<FoodCategory>('food_category').orderBy('id', 'asc');
}
