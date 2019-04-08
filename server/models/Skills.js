var mongoose = require("mongoose");

// TODO: add details to the schema
var skillSchema = mongoose.Schema({
  Name: String,
  Description: String,
  Category: String,
});

mongoose.model("Skills", skillSchema);
