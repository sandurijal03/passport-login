import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import User from '../models/user';

const GoogleStrategy = Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: '/auth/google/redirect',
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });

        console.log(profile);

        if (user) {
          console.log('User is ', user);
          done(null, user);
        } else {
          // create new User
          user = await new User({
            username: profile.displayName,
            googleId: profile.id,
            thumbnail: profile._json.picture,
          });
          try {
            const savedUser = await user.save();
            console.log('new user ', savedUser);
            done(null, savedUser);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  ),
);
