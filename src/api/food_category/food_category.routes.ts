import express from 'express';
import * as FoodCategoryController from './food_category.controller';
import isAuth from '../auth/isAuth.middleware';

const router = express.Router();

router.get('/', isAuth, FoodCategoryController.getAll);

export default router;
