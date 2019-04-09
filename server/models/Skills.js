var mongoose = require("mongoose");

// Details of the Skills schema
var skillSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Category: String,
});

mongoose.model("Skills", skillSchema, "Skills");
