import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('unit').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('unit', function (t) {
        t.string('code').nullable();
        t.dropColumn('name');
        t.dropColumn('description');
      });
    } else {
      console.log('unit table is not available. control previous migrations.');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.hasTable('unit').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('unit', function (t) {
        t.dropColumn('code');
        t.string('name');
        t.string('description');
      });
    } else {
      console.log('unit table is not available. control previous migrations.');
    }
  });
}
