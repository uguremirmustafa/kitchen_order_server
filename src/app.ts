import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import express from 'express';
import { appConfig } from '@config/appConfig';
import bodyParser from 'body-parser';
import sessionConfig from '@config/sessionConfig';
import passport from '@services/auth/passport';
// route imports
import authRoutes from '@routes/auth.route';
import brandRoutes from '@routes/brand.route';
import ingredientRoutes from '@routes/ingredient.route';

const app = express();

// middlewares
const jsonParser = bodyParser.json();
app.use(jsonParser);
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/welcome', (req, res) => res.json(process.env));
app.use('/api/auth', authRoutes);
app.use('/api/brand', brandRoutes);
app.use('/api/ingredient', ingredientRoutes);

app.listen(appConfig.PORT, () => {
  console.log(`listening on ${appConfig.PORT}`);
});
