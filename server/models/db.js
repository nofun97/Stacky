const mongoose = require("mongoose");

// URI to connect to the database (will be put in heroku config vars)
const dbURI = process.env.DB || null;

const options = {
  useNewUrlParser: true,
  dbName: "SkillTree",
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// Require our models
require("./Users.js");
require("./Appointments.js");
require("./Reviews.js");
require("./Skills.js");
require("./Credentials.js");
