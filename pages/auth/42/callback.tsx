import passport from 'passport'
import {Strategy as FortyTwoStrategy} from 'passport-42'
import nc from "next-connect";

var FortyTwoStrategy = require('passport-42').Strategy;

passport.use(new FortyTwoStrategy({
    clientID: process.env.NEXT_PUBLIC_APP_UID,
    clientSecret: process.env.NEXT_PUBLIC_APP_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/42/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

const handler = nc().get('/auth/42/callback',
  passport.authenticate('42', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

  export default handler;