import { Router } from 'express';

const router = Router();

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.redirect('/auth/login');
  }
  next();
};

router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.user });
});

export default router;
