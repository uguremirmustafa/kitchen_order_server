import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('users', function (t) {
        t.unique('email');
      });
    } else {
      console.log('users table is not available. control previous migrations.');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('users', function (t) {
        t.dropUnique(['email']);
      });
    } else {
      console.log('users table is not available. control previous migrations.');
    }
  });
}
