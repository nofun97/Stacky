const mongoose = require("mongoose");
const passport = require("passport");
const Credentials = mongoose.model("Credentials");
const User = mongoose.model("Users");
const userController = require("./userController.js");

var updateEmail = function(req, res, userData) {
  Credentials.findOneAndUpdate(
    {
      _id: userData.Credentials,
    },
    {
      email: req.body.Email,
    },
    function(err, cred) {
      console.log(req.body.Email);
      if (!err) {
        console.log(cred);
        res.send({
          ...userData,
          email: cred.email,
        });
      } else {
        console.log(err);
        res.send({ error: err });
      }
    }
  );
};

// Creating new Credentials
var newUser = function(req, res, next) {
  // console.log("Creating new user");
  const {
    body: { user },
  } = req;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  const finalUser = new Credentials(user);
  // console.log("Just after creating finalUser")
  // console.log(finalUser);
  finalUser.setPassword(user.password);
  finalUser.save();
  return userController.registerUser(req, res, finalUser.toAuthJSON());
};

// Login
var login = (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: "is required",
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required",
      },
    });
  }

  return passport.authenticate(
    "local",
    {
      session: false,
      failureRedirect: "/",
    },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        console.log("Login response");
        res.set("Content-Type", "application/json");
        res.set("Set-Cookie", `Token=${user.token}`);
        return userController.findUserBasedOnCredential(req, res, user);
      }

      return res.status(400).json({
        errors: {
          error: "400 Bad Request",
        },
      });
    }
  )(req, res, next);
};

// Check currently logged in
var current = (req, res, next) => {
  const {
    payload: { id },
  } = req;

  return Credentials.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
};

var checkExistingEmail = (req, res) => {
  var email = req.params.email;
  Credentials.find({ email: email }, (err, cred) => {
    if (!err) {
      if (cred === undefined || cred.length === 0) {
        res.sendStatus(304);
      } else {
        res.sendStatus(200);
      }
    } else {
      res.sendStatus(404);
    }
  });
};

module.exports.login = login;
module.exports.newUser = newUser;
module.exports.current = current;
module.exports.checkExistingEmail = checkExistingEmail;
module.exports.updateEmail = updateEmail;
