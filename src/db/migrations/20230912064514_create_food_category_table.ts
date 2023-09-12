import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('food_category').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('food_category', function (t) {
        t.increments('id').primary();
        t.string('name', 255).notNullable();
        t.text('description');
        t.string('image', 255).nullable();
        t.timestamps(true, true);
      });
    } else {
      console.log('food_category table already exists');
    }
  });

  await knex.schema.hasTable('ingredient').then(function (exists) {
    if (exists) {
      return knex.schema.alterTable('ingredient', function (t) {
        t.integer('food_category_id').unsigned();
        t.foreign('food_category_id').references('food_category.id');
        t.string('image').nullable();
      });
    } else {
      console.log('ingredients table is not available. control previous migrations.');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('ingredient', function (t) {
    t.dropForeign('food_category_id');
    t.dropColumn('food_category_id');
    t.dropColumn('image');
  });
  await knex.schema.dropTableIfExists('food_category');
}
