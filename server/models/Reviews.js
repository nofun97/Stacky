var mongoose = require("mongoose");

// Details of the reviews schema
var reviewSchema = mongoose.Schema({
  teacherPros: String,
  teacherCons: String,
  studentPros: String,
  studentCons: String,
  createdBy: ObjectId,
  createdFor: ObjectId,
  CreatedTime: Date,
});

mongoose.model("Reviews", reviewSchema);
