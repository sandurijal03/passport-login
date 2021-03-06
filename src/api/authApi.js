import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  }),
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // const { username, googleId } = req.user;
  res.redirect('/profile/');
});

export default router;
