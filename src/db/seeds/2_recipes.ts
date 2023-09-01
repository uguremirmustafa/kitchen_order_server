import { Recipe, RecipeIngredient } from '@models/recipe';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<Recipe>('recipe').del();
  await knex<Recipe>('recipe_ingredients').del();

  // Inserts seed entries
  await knex<Recipe>('recipe').insert([
    {
      id: 1,
      name: 'Kremali makarna',
      description:
        'Hazir krema ve penne makarna ile yapilmis harika bir lezzet. Kolay ve doyurucu.',
    },
    {
      id: 2,
      name: 'Körili tavuk',
      description:
        'Hem doyurucu hem leziz. Tavuk filetoyu hem dogramak kolay hem de pismesini beklemek.',
    },
    {
      id: 3,
      name: 'Taze fasulye',
      description:
        'Akdeniz mutfagini vazgecilmezi, domatesle ayse kadin fasulyenin harika karisimi.',
    },
  ]);

  await knex.raw("select setval('recipe_id_seq', max(id)) from recipe");

  await knex<RecipeIngredient>('recipe_ingredients').insert([
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
}
