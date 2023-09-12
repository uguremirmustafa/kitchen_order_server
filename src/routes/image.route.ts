import upload from '@config/multerConfig';
import isAuth from '@services/auth/isAuth.middleware';
import express from 'express';

const router = express.Router();

router.post('/', isAuth, upload.single('image'), async (req, res) => {
  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({ message: 'no file uploaded' });
  }

  return res.status(201).json({ data: `uploads/${req.file.filename}` });
});

export default router;
