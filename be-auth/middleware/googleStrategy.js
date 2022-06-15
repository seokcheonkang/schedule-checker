const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

dotenv.config({ path: path.join(__dirname, `../env/.env.development`) });

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      // passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      console.log('profile: ', profile);

      const user = profile;

      done(null, user);
    }
  )
);

module.exports = passport;
