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

var updateSkill = function(req, res) {
  var id = req.params.id;
  var skill = {
    Name: req.body.Name,
    Description: req.body.Description,
    Category: req.body.Category,
  };
  var options = { omitUndefined: true };
  Skills.findByIdAndUpdate(id, skill, options, function(err) {
    if (!err) {
      res.send({ status: "Successfully updated skill." });
    } else {
      console.log(err);
      res.sendStatus(400);
    }
  });
};

var deleteSkill = function(req, res) {
  var id = req.params.id;
  Skills.findByIdAndDelete(id, function(err) {
    if (!err) {
      res.send({ status: "Successfully deleted skill." });
    } else {
      console.log(err);
      res.sendStatus(400);
    }
  });
};

var searchSkill = function(req, res) {
  Skills.find(
    { Name: { $regex: "^" + req.params.Name, $options: "i" } },
    function(err, docs) {
      if (!err) {
        res.send(docs);
      } else {
        console.log(err);
        res.sendStatus(400);
      }
    }
  );
};

//search skill by category

// Export the variable
module.exports.findAllSkills = findAllSkills;
module.exports.addNewSkill = addNewSkill;
module.exports.searchSkill = searchSkill;
module.exports.deleteSkill = deleteSkill;
module.exports.updateSkill = updateSkill;
