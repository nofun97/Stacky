const jwt = require("express-jwt");


const ensureAuthenticated = function(req, res, next) {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};



module.exports.ensureAuthenticated = ensureAuthenticated;
