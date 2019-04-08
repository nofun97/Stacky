var mongoose = require("mongoose");

// Details of the reviews schema
var reviewSchema = mongoose.Schema({
  TeacherPros: String,
  TeacherCons: String,
  StudentPros: String,
  StudentCons: String,
  CreatedBy: ObjectId,
  CreatedFor: ObjectId,
  CreatedTime: Date,
});

mongoose.model("Reviews", reviewSchema);
