import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import sessionConfig, { redisClient } from '@/config/sessionConfig';
import passport from '@/api/auth/passport';
import * as middlewares from '@/lib/middlewares/middlewares';
import corsConfig from '@/config/corsConfig';
// route imports
import authRoutes from '@/api/auth/auth.routes';
import ingredientRoutes from '@/api/ingredient/ingredient.routes';
import recipeRoutes from '@/api/recipe/recipe.routes';
import foodCategoryRoutes from '@/api/food_category/food_category.routes';
import unitRoutes from '@/api/unit/unit.routes';
import imageRoutes from '@/api/image/image.routes';

const app = express();
// middlewares
const jsonParser = bodyParser.json();
app.use(cors(corsConfig));
app.use(jsonParser);

app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/welcome', (req, res) => res.json(process.env));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/api/auth', authRoutes);
app.use('/api/ingredient', ingredientRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/unit', unitRoutes);
app.use('/api/food-category', foodCategoryRoutes);
app.use('/api/image', imageRoutes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
