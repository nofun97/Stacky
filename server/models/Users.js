var mongoose = require("mongoose");

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

mongoose.model("Users", userSchema);
