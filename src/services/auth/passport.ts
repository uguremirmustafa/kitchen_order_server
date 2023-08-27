import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '@models/user';
import { getUserByEmail, validatePassword } from '@services/auth/auth.service';

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      if (user) {
        const isValid = await validatePassword(password, user.password);
        if (isValid) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'incorrect password' });
        }
      } else {
        return done(null, false, { message: 'user not found' });
      }
    } catch (error) {
      console.log(error);
      return done(null, false, { message: 'incorrect email' });
    }
  })
);

// Serialize and deserialize user functions
passport.serializeUser((user: any, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  getUserByEmail(email as User['email'])
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

export default passport;
