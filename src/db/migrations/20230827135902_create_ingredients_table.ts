import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('brand').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('brand', function (t) {
        t.increments('id').primary();
        t.string('name', 255).notNullable().unique();
        t.text('logo');
        t.timestamps(true, true);
      });
    } else {
      console.log('brand table already exists');
    }
  });

  await knex.schema.hasTable('ingredient').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('ingredient', function (t) {
        t.increments('id').primary();
        t.string('name', 255).notNullable();
        t.string('description', 255);
        t.integer('brand_id').unsigned().notNullable();
        t.foreign('brand_id').references('brand.id');
        t.timestamps(true, true);
      });
    } else {
      console.log('ingredient table already exists');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('ingredient');
  await knex.schema.dropTableIfExists('brand');
}
