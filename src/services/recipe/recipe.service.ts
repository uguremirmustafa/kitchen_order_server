import db from '@db/db';
import { Brand } from '@models/brand';
import { Ingredient } from '@models/ingredient';
import { Recipe, RecipeIngredient } from '@models/recipe';
import { User } from '@models/user';

export async function getAll(user: User) {
  const items = await getRecipesOfUser(user);
  return items ?? [];
}
export async function getOne(id: Recipe['id']) {
  const item = await getRecipeDetailsById(id);
  return item;
}

export async function getRecipes() {
  return db<Recipe>('recipe').select('*').orderBy('id', 'asc');
}
export async function getRecipesOfUser(user: User) {
  return db<Recipe>('recipe').select('*').where('users_id', user.id).orderBy('id', 'asc');
}

export async function getRecipeById(id: Recipe['id']) {
  return db<Recipe>('recipe')
    .select('recipe.id', 'recipe.name', 'recipe.description', 'recipe.image')
    .where('recipe.id', id)
    .first();
}

export async function getRecipeDetailsById(id: Recipe['id']) {
  return db
    .select(
      'r.id',
      'r.name',
      'r.description',
      'r.image',
      'r.cooking_time',
      'r.for_x_person',
      'r.prep_time',
      db.raw(`
        json_agg(
          jsonb_build_object(
            'amount', ri.amount,
            'unit', u.description,
            'brandName', b.name,
            'ingredientName', i.name,
            'unit_id', u.id,
            'ingredient_id', i.id
          ) ORDER BY ri.id ASC
        ) FILTER (WHERE ri.amount IS NOT NULL AND u.description IS NOT NULL AND b.name IS NOT NULL AND i.name IS NOT NULL) AS ingredients
      `)
    )
    .from('recipe as r')
    .leftJoin('recipe_ingredients as ri', 'r.id', 'ri.recipe_id')
    .leftJoin('ingredient as i', 'ri.ingredient_id', 'i.id')
    .leftJoin('brand as b', 'i.brand_id', 'b.id')
    .leftJoin('unit as u', 'ri.unit_id', 'u.id')
    .where('r.id', id)
    .groupBy('r.id', 'r.name')
    .first();
}

export type RecipeAndIngredients = Recipe & {
  ingredients: Omit<RecipeIngredient, 'id' | 'recipe_id'>[];
};

export async function createOne(data: RecipeAndIngredients, user: User) {
  const result = await db.transaction(async (trx) => {
    try {
      const [recipeId] = await trx<Recipe>('recipe')
        .insert({
          name: data.name,
          description: data?.description,
          users_id: user.id,
          image: data?.image,
          cooking_time: data.cooking_time,
          for_x_person: data.for_x_person,
          prep_time: data.prep_time,
        })
        .returning('id');
      const insertPromises = data.ingredients.map((i) =>
        trx<RecipeIngredient>('recipe_ingredients').insert({
          ingredient_id: i.ingredient_id,
          amount: i.amount,
          recipe_id: recipeId.id,
          unit_id: i.unit_id,
        })
      );
      await Promise.all(insertPromises);
      console.log(`New recipe inserted with ID: ${recipeId.id}`);
      return recipeId.id;
    } catch (error) {
      console.error('Error inserting recipe:', error);
      throw error; // Rollback the transaction
    }
  });
  return result;
}
export async function updateOne(recipeId: number, data: RecipeAndIngredients) {
  const result = await db.transaction(async (trx) => {
    try {
      // Update the recipe table
      await trx<Recipe>('recipe').where('id', recipeId).update({
        name: data.name,
        description: data.description,
        image: data.image,
        cooking_time: data.cooking_time,
        for_x_person: data.for_x_person,
        prep_time: data.prep_time,
      });

      // Delete existing recipe ingredients
      await trx<RecipeIngredient>('recipe_ingredients').where('recipe_id', recipeId).del();

      // Insert new recipe ingredients
      const insertPromises = data.ingredients.map((i) =>
        trx<RecipeIngredient>('recipe_ingredients').insert({
          ingredient_id: i.ingredient_id,
          amount: i.amount,
          recipe_id: recipeId,
          unit_id: i.unit_id,
        })
      );

      await Promise.all(insertPromises);

      console.log(`Recipe with ID ${recipeId} updated successfully`);
      return recipeId;
    } catch (error) {
      console.error('Error updating recipe:', error);
      throw error; // Rollback the transaction
    }
  });
  return result;
}

export async function deleteOne(id: Ingredient['id']): Promise<boolean> {
  let trx = await db.transaction();

  try {
    trx = await db.transaction();

    // First, delete related records in the 'recipe_ingredients' table
    await trx('recipe_ingredients').where('recipe_id', id).del();

    // Then, delete the recipe itself in the 'recipe' table
    await trx('recipe').where('id', id).del();

    // Commit the transaction if everything is successful
    await trx.commit();

    return true;
  } catch (error) {
    // Rollback the transaction if an error occurs
    await trx?.rollback();
    console.error('Error deleting recipe and related records:', error);

    return false;
  }
}

// select
// 	r.id as recipeId,
// 	r.name as recipeName,
// 	json_agg(jsonb_build_object(
//         'amount', ri.amount,
//         'unit', u.description,
// 		'brandName', b.name,
//         'ingredientName', i.name
//     )) AS ingredients
// from recipe as r
// left join recipe_ingredients as ri on r.id = ri.recipe_id
// left join ingredient as i on ri.ingredient_id = i.id
// left join brand as b on i.brand_id = b.id
// left join unit as u on ri.unit_id = u.id
// where r.id = 1
// GROUP BY r.id, r.name;
