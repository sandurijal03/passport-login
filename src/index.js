import { join } from 'path';

import express from 'express';
import cookieSession from 'cookie-session';

require('./config/passport-setup');

import authRouter from './api/authApi';
import profileRouter from './api/profileApi';
import connectDB from './utils/connectDB';
import passport from 'passport';

const app = express();
connectDB();

app.set('view engine', 'ejs');
app.set('views', join(__dirname + '/views'));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('home');
});

app.use('/auth', authRouter);
app.use('/profile', profileRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('server listening on port ', port));
