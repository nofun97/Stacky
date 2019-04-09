var mongoose = require("mongoose");

// Require the model that's related for this controller
var Skills = mongoose.model("Skills");

// Define the function to be used (create, remove, update, findall, etc.)
var findAllSkills = function(req, res) {
  Skills.find(function(err, users) {
    if (!err) {
      res.send(users);
    } else {
      res.sendStatus(404);
    }
  });
};

var addNewSkills = function(req, res) {
  var skill = new Skills({
    Name: req.body.Name,
    Description: req.body.Description,
    Category: req.body.Category,
  });
  skill.save(function(err, skill) {
    if (!err) {
      res.send(skill);
    } else {
      res.sendStatus(400);
    }
  });
};

// Export the variable
module.exports.findAllSkills= findAllSkills;
module.exports.addNewSkills = addNewSkills;
