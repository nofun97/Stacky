var mongoose = require("mongoose");

// Require the model that's related for this controller
var User = mongoose.model("Users");

// Define the function to be used (create, remove, update, findall, etc.)
var findAllUsers = function(req, res) {
  User.find(function(err, users) {
    if (!err) {
      res.send(users);
    } else {
      res.sendStatus(404);
    }
  });
};

// Export the variable
module.exports.findAllUsers = findAllUsers;
