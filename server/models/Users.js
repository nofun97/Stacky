var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

// Details of the Users schema
var userSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  DOB: Date,
  UName: String,
  Email: String,
  Password: String,
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
