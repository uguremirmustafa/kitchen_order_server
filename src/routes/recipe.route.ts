import { User } from '@models/user';
import isAuth from '@services/auth/isAuth.middleware';
import { createOne, deleteOne, getAll, getOne, updateOne } from '@services/recipe/recipe.service';
import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const user = req.user as User;
  const data = await getAll(user);
  res.json({ data });
});
router.get('/:id', isAuth, param('id').isNumeric(), async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.json(result.array());
  }
  const data = await getOne(Number(req.params.id));
  if (!data) {
    return res.status(400).json({ message: 'sth went wrong' });
  }
  return res.json({ data });
});
// --------------------------------------------------
router.post(
  '/',
  isAuth,
  body('name').isString(),
  body('description').isString().isLength({ max: 255 }).optional(),
  body('ingredients').isArray({ min: 1 }),
  body('ingredients.*.ingredient_id').isNumeric().exists(),
  body('ingredients.*.amount').isNumeric().exists(),
  body('ingredients.*.unit_id').isNumeric().exists(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.json(result.array());
    }
    const user = req.user as User;

    const data = await createOne(req.body, user);
    if (!data) {
      return res.status(400).json({ message: 'sth went wrong' });
    }
    return res.status(201).json({ data: { id: data } });
  }
);

router.put(
  '/:id',
  isAuth,
  body('name').isString(),
  body('description').isString().isLength({ max: 255 }).optional(),
  body('ingredients').isArray({ min: 1 }),
  body('ingredients.*.ingredient_id').isNumeric().exists(),
  body('ingredients.*.amount').isNumeric().exists(),
  body('ingredients.*.unit_id').isNumeric().exists(),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.json(result.array());
    }
    const data = await updateOne(Number(req.params.id), req.body);
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
