import isAuth from '@services/auth/isAuth.middleware';
import { getAll } from '@services/food-category/food-category.service';

import express from 'express';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const data = await getAll();
  res.json({ data });
});

export default router;
