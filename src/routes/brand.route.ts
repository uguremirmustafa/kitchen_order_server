import isAuth from '@services/auth/isAuth.middleware';
import { createBrand, getAll } from '@services/brand/brand.service';
import express from 'express';
import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const data = await getAll();
  res.json({ data });
});
router.post(
  '/',
  isAuth,
  body('name').isString(),
  body('logo').isURL().optional(),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.json(result.array());
    }

    const data = await createBrand({ name: req.body.name, logo: req.body.logo });
    if (!data) {
      return res.status(400).json({ message: 'sth went wrong' });
    }
    return res.status(201).json({ data });
  }
);

export default router;
