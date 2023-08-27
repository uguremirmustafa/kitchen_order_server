import { Brand } from '@models/brand';
import { Ingredient } from '@models/ingredient';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<Ingredient>('ingredient').del();
  await knex<Brand>('brand').del();

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
  ]);
  // we are setting the id_seq of the table manually for later inserts
  await knex.raw("select setval('brand_id_seq', max(id)) from brand");

  await knex<Ingredient>('ingredient').insert([
    { id: 1, name: 'Spagetti makarna', brand_id: 6 },
    { id: 2, name: 'Baldo pirinç', brand_id: 4 },
    { id: 3, name: 'Salkım Domates', brand_id: 1 },
    { id: 4, name: 'Fındık içi', brand_id: 9 },
    { id: 5, name: 'Kola', brand_id: 8 },
    { id: 6, name: 'Çay', brand_id: 3 },
    { id: 7, name: 'Kıyma', brand_id: 1 },
    { id: 8, name: 'Peynir', brand_id: 10 },
  ]);
  // we are setting the id_seq of the table manually for later inserts
  await knex.raw("select setval('ingredient_id_seq', max(id)) from ingredient");
}
