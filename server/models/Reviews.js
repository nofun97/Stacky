var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var mongoosePaginate = require("mongoose-paginate-v2");

// Details of the reviews schema
var reviewSchema = mongoose.Schema({
  TargetRole : String,
  Pros: String,
  Cons: String,
  CreatedBy: ObjectId,
  ReviewerFirstName: String,
  ReviewerLastName: String,
  CreatedFor: ObjectId,
  RevieweeFirstName: String,
  RevieweeLastName: String,
  CreatedTime: Date,
  Type: String,
});

reviewSchema.plugin(mongoosePaginate);

mongoose.model("Reviews", reviewSchema, "Reviews");
