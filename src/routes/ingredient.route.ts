import isAuth from '@services/auth/isAuth.middleware';
import {
  createOne,
  deleteOne,
  getAll,
  getCategoryItems,
  updateOne,
} from '@services/ingredient/ingredient.service';
import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const data = await getAll();
  res.json({ data });
});

router.get('/:categoryId', isAuth, param('categoryId').isNumeric(), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json(result.array());
  }

  const data = await getCategoryItems(Number(req.params.categoryId));
  res.json({ data });
});

router.post(
  '/',
  isAuth,
  body('name').isString(),
  body('description').isString().isLength({ max: 255 }).optional(),
  body('brand_id').isNumeric(),
  body('food_category_id').isNumeric(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.json(result.array());
    }
    const data = await createOne(req.body);
    if (!data) {
      return res.status(400).json({ message: 'sth went wrong' });
    }
    return res.status(201).json({ data });
  }
);
router.put(
  '/:id',
  isAuth,
  param('id').isNumeric(),
  body('name').isString(),
  body('description').isString().isLength({ max: 255 }).optional(),
  body('brand_id').isNumeric(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json(result.array());
    }
    const data = await updateOne(req.body, Number(req.params.id));
    if (!data) {
      return res.status(400).json({ message: 'sth went wrong' });
    }
    return res.status(201).json({ data });
  }
);
router.delete('/:id', isAuth, param('id').isNumeric(), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json(result.array());
  }
  const data = await deleteOne(Number(req.params.id));
  if (!data) {
    return res.status(400).json({ message: 'sth went wrong' });
  }
  return res.status(201).json({ data });
});

export default router;
