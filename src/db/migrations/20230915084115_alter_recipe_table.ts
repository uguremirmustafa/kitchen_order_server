import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('recipe', function (t) {
        t.integer('users_id').unsigned();
        t.foreign('users_id').references('users.id');
        t.string('image').nullable();
      });
    } else {
      console.log('recipe table is not available. control previous migrations.');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('recipe', function (t) {
    t.dropForeign('users_id');
    t.dropColumn('users_id');
    t.dropColumn('image');
  });
}
