import { Unit } from '@models/unit';
import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex<Unit>('unit').del();

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
}
