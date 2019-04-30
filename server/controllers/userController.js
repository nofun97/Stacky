var mongoose = require("mongoose");

// Require the model that's related for this controller
var User = mongoose.model("Users");
var Skills = mongoose.model("Skills");
var credentialsController = require("./credentialsController.js");

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

var registerUser = function(req, res, id) {
  var data = new User({
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    DOB: req.body.DOB,
    Credentials: id,
    UName: req.body.UName,
    IsVerified: req.body.IsVerified,
    Address: req.body.Address,
    Skills: req.body.Skills,
    Interests: req.body.Interests,
  });
  // console.log("Just after defining data for registerUser");
  data.save();
  // data.save(function(err, skill) {
  //   if (!err) {
  //     res.send(skill);
  //     // console.log(skill);
  //   } else {
  //     console.log(err);
  //     res.sendStatus(400);
  //   }
  // });
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
  User.updateOne(
    {
      _id: req.params.id,
    },
    {
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      DOB: req.body.DOB,
      Email: req.body.Email,
      Password: req.body.Password,
      Address: req.body.Address,
      Skills: req.body.Skills,
      Interests: req.body.Interests,
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

var findUser = function(req, res) {
  User.findOne(
    {
      UName: req.body.UName,
    },
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

var findUserBasedOnCredential = function(req, res) {
  User.findOne({ Credentials: req.body.Credentials }, function(err, user) {
    if (!err) {
      res.send(user);
    } else {
      console.log(err);
      res.sendStatus(400);
    }
  });
};

var findNUsers = function(req, res) {
  var index = parseInt(req.query.from);
  var size = parseInt(req.query.size);
  if (index == null || size == null) {
    res.sendStatus(400);
    console.log("index and size must be defined");
  }

  console.log(`finding ${size} users from ${index}`);
  User.paginate({}, { offset: index, limit: size }, (err, result) => {
    if (!err) {
      console.log(`Total data: ${result.totalDocs}`);
      res.send({
        users: result.docs,
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
module.exports.findUser = findUser;
module.exports.deleteUser = deleteUser;
module.exports.updateProfile = updateProfile;
module.exports.findUserBasedOnSkills = findUserBasedOnSkills;
module.exports.findUserBasedOnCredential = findUserBasedOnCredential;
module.exports.findNUsers = findNUsers;
