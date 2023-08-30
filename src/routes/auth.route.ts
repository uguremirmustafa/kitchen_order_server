import { registerUser } from '@services/auth/auth.service';
import isAuth from '@services/auth/isAuth.middleware';
import express from 'express';
import { body, validationResult } from 'express-validator';
import passport from 'passport';

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', data: req.user });
});

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 4, max: 8 }),
  async (req, res) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.json(result.array());
    }

    const { email, password } = req.body;
    const data = await registerUser({ email, password });

    if (!data) {
      return res.status(400).json({ message: 'sth went wrong' });
    }
    return res.status(200).json({ data });
  }
);

router.get('/profile', isAuth, async (req, res) => {
  res.status(200).json(req.user);
});

router.post('/logout', isAuth, async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({ message: 'logged out', data: true });
  });
});

export default router;
