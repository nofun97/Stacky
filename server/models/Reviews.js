var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

// Details of the reviews schema
var reviewSchema = mongoose.Schema({
  TargetRole : String,
  Pros: String,
  Cons: String,
  CreatedBy: ObjectId,
  CreatedFor: ObjectId,
  CreatedTime: Date,
});

mongoose.model("Reviews", reviewSchema, "Reviews");
