var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
//TODO: remember to change schema and controller for Users to implement credentials

// Details of the Users schema
var userSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  DOB: Date,
  UName: String,
  Credentials: ObjectId,
  IsVerified: Boolean,
  Address: String,
  Skills: [
    {
      Skill: ObjectId,
      Level: String,
    },
  ],
  Interests: [
    {
      Skill: ObjectId,
      Level: String,
    },
  ],
});

mongoose.model("Users", userSchema, "Users");
