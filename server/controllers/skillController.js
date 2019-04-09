var mongoose = require("mongoose");
var Skills = mongoose.model("Skills");

// Function to find all Skills
var findAllSkills = function(req, res) {
  Skills.find(function(err, skills) {
    if (!err) {
      res.send(skills);
    } else {
      res.sendStatus(404);
    }
  });
};

// Function to add new skill
var addNewSkill = function(req, res) {
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

var searchSkill = function(req, res) {
  Skills.find(
    {Name: {"$regex": "^" + req.body.Name, "$options": "i"}},
    function(err, docs){
      if (!err){
        res.send(docs);
      } else {
        console.log(err);
        res.sendStatus(400);
      }
    }
  )
}

// Export the variable
module.exports.findAllSkills = findAllSkills;
module.exports.addNewSkill = addNewSkill;
module.exports.searchSkill = searchSkill;
