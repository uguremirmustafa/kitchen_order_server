import { Brand } from '@models/brand';
import { FoodCategory } from '@models/food_category';
import { Ingredient } from '@models/ingredient';
import { Recipe, RecipeIngredient } from '@models/recipe';
import { Unit } from '@models/unit';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('recipe_ingredients').del();
  await knex('unit').del();
  await knex('recipe').del();
  await knex('ingredient').del();
  await knex('food_category').del();
  await knex('brand').del();

  // Inserts seed entries
  await knex<Unit>('unit').insert([
    { id: 1, name: 'kg', description: 'kilogram' },
    { id: 2, name: 'pcs', description: 'piece' },
    { id: 3, name: 'pkg', description: 'package' },
    { id: 4, name: 'lt', description: 'liter' },
    { id: 5, name: 'loaf', description: 'loaf' },
    { id: 6, name: 'jar', description: 'jar' },
    { id: 7, name: 'spoon', description: 'spoon' },
  ]);

  await knex.raw("select setval('unit_id_seq', max(id)) from unit");

  // Inserts seed entries
  await knex<FoodCategory>('food_category').insert([
    { id: 1, name: 'Bakliyat' },
    { id: 2, name: 'Meyve' },
    { id: 3, name: 'Sebze' },
    { id: 4, name: 'Dondurulmuş Gıda' },
    { id: 5, name: 'Et-Tavuk-Şarküteri' },
    { id: 6, name: 'Süt Ürünleri' },
    { id: 7, name: 'Ekmek-Pastane' },
    { id: 8, name: 'Kahvaltılık' },
    { id: 9, name: 'Yemeklik Malzemeler' },
    { id: 10, name: 'İçecek' },
    { id: 11, name: 'Konserve-Soslar' },
    { id: 12, name: 'Kuruyemiş' },
    { id: 13, name: 'Abur-cubur' },
  ]);

  await knex.raw("select setval('food_category_id_seq', max(id)) from unit");

  // Inserts seed entries
  await knex<Brand>('brand').insert([
    { id: 1, name: 'NONAME' },
    { id: 2, name: 'Reis' },
    { id: 3, name: 'Çaykur' },
    { id: 4, name: 'Piyale' },
    { id: 5, name: 'Dr.Oetkeur' },
    { id: 6, name: 'Nuhun Ankara' },
    { id: 7, name: 'Barilla' },
    { id: 8, name: 'Coca Cola' },
    { id: 9, name: 'Fiskobirlik' },
    { id: 10, name: 'İçim' },
    { id: 11, name: 'Tamek' },
  ]);
  // we are setting the id_seq of the table manually for later inserts
  await knex.raw("select setval('brand_id_seq', max(id)) from brand");

  await knex<Ingredient>('ingredient').insert([
    { id: 1, name: 'Spagetti makarna', brand_id: 6, food_category_id: 1 },
    { id: 2, name: 'Baldo pirinç', brand_id: 4, food_category_id: 1 },
    { id: 3, name: 'Salkım Domates', brand_id: 1, food_category_id: 3 },
    { id: 4, name: 'Fındık içi', brand_id: 9, food_category_id: 12 },
    { id: 5, name: 'Kola', brand_id: 8, food_category_id: 10 },
    { id: 6, name: 'Çay', brand_id: 3, food_category_id: 10 },
    { id: 7, name: 'Kıyma', brand_id: 1, food_category_id: 5 },
    { id: 8, name: 'Peynir', brand_id: 10, food_category_id: 6 },
    { id: 9, name: 'Penne makarna', brand_id: 7, food_category_id: 1 },
    { id: 10, name: 'Yemeklik krema', brand_id: 10, food_category_id: 6 },
    { id: 11, name: 'Domates salcasi', brand_id: 11, food_category_id: 9 },
    { id: 12, name: 'Sogan', brand_id: 1, food_category_id: 3 },
    {
      id: 13,
      name: 'Kusbasi',
      brand_id: 1,
      food_category_id: 5,
      image: 'https://docsd.ceptesok.com/product/1000x1000/804cc_Dana_Kusbasi_400_Gr.jpg',
    },
  ]);
  // we are setting the id_seq of the table manually for later inserts
  await knex.raw("select setval('ingredient_id_seq', max(id)) from ingredient");

  await knex<Recipe>('recipe').insert([
    {
      id: 1,
      name: 'Kremali makarna',
      description:
        'Hazir krema ve penne makarna ile yapilmis harika bir lezzet. Kolay ve doyurucu.',
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

  await knex.raw("select setval('recipe_ingredients_id_seq', max(id)) from recipe_ingredients");
}
