import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('recipe', function (t) {
        t.string('for_x_person').nullable();
        t.string('prep_time').nullable();
        t.string('cooking_time').nullable();
      });
    } else {
      console.log('recipe table is not available. control previous migrations.');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('recipe', function (t) {
    t.dropColumn('for_x_person');
    t.dropColumn('prep_time');
    t.dropColumn('cooking_time');
  });
}
