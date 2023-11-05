import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('ingredient').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('ingredient', function (t) {
        t.dropForeign('brand_id');
        t.dropColumn('brand_id');
      });
    } else {
      console.log('users table is not available. control previous migrations.');
    }
  });
}

export async function down(knex: Knex): Promise<void> {}
