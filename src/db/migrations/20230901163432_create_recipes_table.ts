import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.hasTable('recipe').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('recipe', function (t) {
        t.increments('id').primary();
        t.string('name', 255).notNullable();
        t.text('description');
        t.timestamps(true, true);
      });
    } else {
      console.log('recipe table already exists');
    }
  });

  await knex.schema.hasTable('unit').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('unit', function (t) {
        t.increments('id').primary();
        t.string('name').notNullable();
        t.text('description');
      });
    } else {
      console.log('unit table already exists');
    }
  });

  await knex.schema.hasTable('recipe_ingredients').then(function (exists) {
    if (!exists) {
      return knex.schema.createTable('recipe_ingredients', function (t) {
        t.increments('id').primary();
        t.integer('recipe_id').unsigned();
        t.foreign('recipe_id').references('recipe.id');
        t.integer('ingredient_id').unsigned();
        t.foreign('ingredient_id').references('ingredient.id');
        t.float('amount').notNullable();
        t.integer('unit_id').unsigned();
        t.foreign('unit_id').references('unit.id');
        t.timestamps(true, true);
      });
    } else {
      console.log('recipe_ingredients table already exists');
    }
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('recipe_ingredients');
  await knex.schema.dropTableIfExists('unit');
  await knex.schema.dropTableIfExists('recipe');
}
