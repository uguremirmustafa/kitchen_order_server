import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('users').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('users', function (t) {
        t.increments('id').primary();
        t.string('firstName', 60);
        t.string('lastName', 60);
        t.string('email', 100);
        t.string('password', 255);
      });
    } else {
      console.log('users table already exists');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
