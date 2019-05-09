var mongoose = require("mongoose");

// Require the model that's related for this controller
var User = mongoose.model("Users");
var Skills = mongoose.model("Skills");
var passport = require("passport");
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

var findUserById = function(req, res) {
  User.findById(req.params.id, (err, user) => {
    if (!err) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  });
};

var registerUser = function(req, res, next) {
  var data = new User({
    Email: req.body.Email,
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    DOB: req.body.DOB,
    IsVerified: req.body.IsVerified,
    Description: req.body.Description,
    Address: req.body.Address,
    Skills: req.body.Skills,
    Interests: req.body.Interests,
  });

  console.log("Registering...");
  User.register(data, req.body.Password, function(err, user) {
    if (err) {
      next(null, err);
    } else {
      next(null, { Email: data.Email, Password: req.body.Password });
    }
  });
};

var deleteUser = function(req, res) {
  User.deleteOne(
    {
      _id: req.params.id,
    },
    function(err) {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({
          status: "Deletion Successful",
        });
      }
    }
  );
};

var updateProfile = function(req, res) {
  User.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      DOB: req.body.DOB,
      IsVerified: req.body.IsVerified,
      Description: req.body.Description,
      Address: req.body.Address,
      Skills: req.body.Skills,
      Interests: req.body.Interests,
      Description: req.body.Description,
      Email: req.body.Email,
    },
    { strict: true, omitUndefined: true },
    function(err, user) {
      if (!err) {
        res.send(user);
      } else {
        console.log(err);
        res.sendStatus(400);
      }
    }
  );
};

var findUserBasedOnSkills = function(req, res) {
  Skills.find(
    { Name: { $regex: "^" + req.body.SkillName, $options: "i" } },
    function(err, docs) {
      if (!err) {
        var ids = [];
        for (id in docs) {
          ids.push(docs[id]["_id"]);
        }
        User.find({ "Skills.Skill": { $all: ids } }, function(err, users) {
          if (!err) {
            res.send(users);
          } else {
            console.log(err);
            res.sendStatus(400);
          }
        });
      } else {
        console.log(err);
        res.sendStatus(400);
      }
    }
  );
};

var findNUsers = function(req, res) {
  var index = parseInt(req.query.from);
  var size = parseInt(req.query.size);

  if (index == null || size == null) {
    res.sendStatus(400);
    console.log("index and size must be defined");
  }
  var query = {};
  if (req.query.skills != null) {
    console.log(skills);
    var skills = req.query.skills.split(",");
    query = { "Skills.Skill": { $all: skills } };
  }

  User.paginate(query, { offset: index, limit: size }, (err, result) => {
    if (!err) {
      var newDocs = result.docs.map(data => {
        return {
          FirstName: data.FirstName,
          LastName: data.LastName,
          DOB: data.DOB,
          IsVerified: data.IsVerified,
          Description: data.Description,
          Address: data.Address,
          Skills: data.Skills,
          Interests: data.Interests,
          Description: data.Description,
          Email: data.Email,
          _id: data._id,
        };
      });
      res.send({
        users: newDocs,
        total: result.totalDocs,
      });
    } else {
      console.log(err);
      res.sendStatus(400);
    }
  });
};

// Export the variable
module.exports.findAllUsers = findAllUsers;
module.exports.registerUser = registerUser;
module.exports.deleteUser = deleteUser;
module.exports.updateProfile = updateProfile;
module.exports.findUserBasedOnSkills = findUserBasedOnSkills;
module.exports.findNUsers = findNUsers;
module.exports.findUserById = findUserById;
