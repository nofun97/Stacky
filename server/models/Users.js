var mongoose = require("mongoose");

// TODO: add details to the schema
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

mongoose.model("Users", userSchema);
