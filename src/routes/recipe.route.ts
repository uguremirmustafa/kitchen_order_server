import isAuth from '@services/auth/isAuth.middleware';
import { getAll, getOne } from '@services/recipe/recipe.service';
import express from 'express';
import { body, param, query, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', isAuth, async (req, res) => {
  const data = await getAll();
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
// router.post(
//   '/',
//   isAuth,
//   body('name').isString(),
//   body('description').isString().isLength({ max: 255 }).optional(),
//   body('brand_id').isNumeric(),
//   async (req, res) => {
//     const result = validationResult(req);

//     if (!result.isEmpty()) {
//       return res.json(result.array());
//     }
//     const data = await createOne(req.body);
//     if (!data) {
//       return res.status(400).json({ message: 'sth went wrong' });
//     }
//     return res.status(201).json({ data });
//   }
// );

// router.put(
//   '/:id',
//   isAuth,
//   param('id').isNumeric(),
//   body('name').isString(),
//   body('description').isString().isLength({ max: 255 }).optional(),
//   body('brand_id').isNumeric(),
//   async (req, res) => {
//     const result = validationResult(req);
//     if (!result.isEmpty()) {
//       return res.json(result.array());
//     }
//     const data = await updateOne(req.body, Number(req.params.id));
//     if (!data) {
//       return res.status(400).json({ message: 'sth went wrong' });
//     }
//     return res.status(201).json({ data });
//   }
// );
// router.delete('/:id', isAuth, param('id').isNumeric(), async (req, res) => {
//   const result = validationResult(req);
//   if (!result.isEmpty()) {
//     return res.json(result.array());
//   }
//   const data = await deleteOne(Number(req.params.id));
//   if (!data) {
//     return res.status(400).json({ message: 'sth went wrong' });
//   }
//   return res.status(201).json({ data });
// });

export default router;
