import {
  FoodCategoryWithId,
  IngredientWithId,
  RecipeIngredientWithId,
  RecipeWithId,
  UnitWithId,
} from '@/lib/types';
import { Knex } from 'knex';
import { ingredients } from '../seed-files/ingredients';

export async function seed(knex: Knex): Promise<void> {
  await knex('recipe_ingredients').del();
  await knex('unit').del();
  await knex('recipe').del();
  await knex('ingredient').del();
  await knex('food_category').del();

  // Inserts seed entries
  await knex<UnitWithId>('unit').insert([
    { id: 1, code: 'GRAM' },
    { id: 2, code: 'LITER' },
    { id: 3, code: 'TABLESPOON' },
    { id: 4, code: 'TEASPOON' },
    { id: 5, code: 'CUP' },
    { id: 6, code: 'LOAF' },
    { id: 7, code: 'PACKAGE' },
    { id: 8, code: 'CLOVE' },
  ]);

  await knex.raw("select setval('unit_id_seq', max(id)) from unit");

  // Inserts seed entries
  await knex<FoodCategoryWithId>('food_category').insert([
    { id: 1, name: 'Atiştırmalık' },
    { id: 2, name: 'Meyve-sebze' },
    { id: 3, name: 'İçecek' },
    { id: 4, name: 'Dondurulmuş Gıda' },
    { id: 5, name: 'Et-Tavuk-Şarküteri' },
    { id: 6, name: 'Süt Ürünleri' },
    { id: 7, name: 'Ekmek-Pastane' },
    { id: 8, name: 'Kahvaltılık' },
    { id: 9, name: 'Yemeklik Malzemeler' },
  ]);

  await knex.raw("select setval('food_category_id_seq', max(id)) from unit");

  await knex<IngredientWithId>('ingredient').insert(ingredients);
  // we are setting the id_seq of the table manually for later inserts
  await knex.raw("select setval('ingredient_id_seq', max(id)) from ingredient");

  await knex<RecipeWithId>('recipe').insert([
    {
      id: 1,
      name: 'Kremali makarna',
      description:
        'Hazir krema ve penne makarna ile yapilmis harika bir lezzet. Kolay ve doyurucu.',
    },
  ]);

  await knex.raw("select setval('recipe_id_seq', max(id)) from recipe");

  await knex<RecipeIngredientWithId>('recipe_ingredients').insert([
    {
      id: 1,
      recipe_id: 1,
      amount: 1,
      unit_id: 3,
      ingredient_id: 9,
    },
    {
      id: 2,
      recipe_id: 1,
      amount: 0.5,
      unit_id: 3,
      ingredient_id: 10,
    },
    {
      id: 3,
      recipe_id: 1,
      amount: 1,
      unit_id: 7,
      ingredient_id: 11,
    },
    {
      id: 4,
      recipe_id: 1,
      amount: 1,
      unit_id: 2,
      ingredient_id: 12,
    },
  ]);

  await knex.raw("select setval('recipe_ingredients_id_seq', max(id)) from recipe_ingredients");
}
