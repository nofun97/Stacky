const mongoose = require("mongoose");
const passport = require("passport");
const Credentials = mongoose.model("Credentials");
const userController = require("./userController.js");
// Creating new Credentials
var newUser = function (req, res, next) {
  // console.log("Creating new user");
  const { body: { user } } = req;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }
  
  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Credentials(user);
  // console.log("Just after creating finalUser")
  // console.log(finalUser);
  finalUser.setPassword(user.password);
  var ID = finalUser.toAuthJSON()._id;
  finalUser.save(function(err, credential) {
    if (!err) {
      return
    }
    console.log(err);
  });
  return userController.registerUser(req, res, ID);
};

// Login
var login = (req, res, next) => {
  const { body: { user } } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if (err) {
      return next(err);
    }

    if (passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return info.status(400);
  })(req, res, next);
};

// Check currently logged in 
var current = (req, res, next) => {
  const { payload: { id } } = req;

  return Credentials.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
}

module.exports.login = login;
module.exports.newUser = newUser;
module.exports.current = current;