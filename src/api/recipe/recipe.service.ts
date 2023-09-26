import db from '@/db/db';
import {
  Recipe,
  RecipeAndIngredients,
  RecipeIngredient,
  RecipeWithId,
  UserWithId,
} from '@/lib/types';

export async function getRecipesOfUser(userId: UserWithId['id']) {
  return db<RecipeWithId>('recipe').select('*').where('users_id', userId).orderBy('id', 'asc');
}

export async function createRecipe(data: RecipeAndIngredients, userId: UserWithId['id']) {
  const result = await db.transaction(async (trx) => {
    try {
      const [recipe] = await trx<RecipeWithId>('recipe')
        .insert({
          name: data.name,
          description: data?.description,
          users_id: userId,
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
          recipe_id: recipe.id,
          unit_id: i.unit_id,
        })
      );
      await Promise.all(insertPromises);
      return recipe.id;
    } catch (error) {
      throw new Error('Error inserting recipe:'); // Rollback the transaction
    }
  });
  return result;
}

export async function updateRecipe(recipeId: number, data: RecipeAndIngredients) {
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

      return recipeId;
    } catch (error) {
      throw new Error('Error updating recipe:' + recipeId); // Rollback the transaction
    }
  });
  return result;
}

export async function deleteRecipe(id: RecipeWithId['id']): Promise<boolean> {
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
