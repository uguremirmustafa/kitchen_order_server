import express from 'express';
import passport from 'passport';
import * as AuthController from './auth.controller';
import { validateRegisterBody } from './auth.validations';
import isAuth from './isAuth.middleware';

const router = express.Router();

router.post('/login', passport.authenticate('local'), AuthController.loginHandler);
router.post('/register', validateRegisterBody, AuthController.registerHandler);

// router.post('/login', passport.authenticate('local'), (req, res) => {
//   res.json({ message: 'Login successful', data: req.user });
// });

// router.post('/register', validateRequest({ body: User }), async (req, res) => {
//   const { email, password } = req.body;
//   const data = await registerUser({ email, password });

//   if (!data) {
//     return res.status(400).json({ message: 'sth went wrong' });
//   }
//   return res.status(200).json({ data });
// });

router.get('/profile', isAuth, async (req, res) => {
  res.status(200).json({ data: req.user });
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
