import express from 'express';
import * as RecipeController from './recipe.controller';
import { validateCreateRecipeBody } from './recipe.validations';
import isAuth from '../auth/isAuth.middleware';

const router = express.Router();

router.get('/', isAuth, RecipeController.getAllForUser);
router.post('/', isAuth, validateCreateRecipeBody, RecipeController.createOne);

export default router;
