const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Credentials = mongoose.model('Credentials');

passport.use(new LocalStrategy({
  usernameField: 'User[email]',
  passwordField: 'User[password]',
}, (email, password, done) => {
  Credentials.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));