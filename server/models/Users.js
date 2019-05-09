var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var mongoosePaginate = require("mongoose-paginate-v2");
const passportLocalMongoose = require('passport-local-mongoose');

// Details of the Users schema
const userSchema = mongoose.Schema({
  FirstName: String,
  LastName: String,
  DOB: Date,
  Email: String,
  Description: String,
  IsVerified: Boolean,
  Address: String,
  Skills: [
    {
      Name: String,
      Skill: ObjectId,
      Level: String,
    },
  ],
  Interests: [
    {
      Name: String,
      Skill: ObjectId,
      Level: String,
    },
  ],
});

userSchema.plugin(mongoosePaginate);
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'Email',
  usernameLowerCase: true,
});

module.exports = mongoose.model("Users", userSchema, "Users");;