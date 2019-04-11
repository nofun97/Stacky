var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

// Details of the Appointments schema
var appointmentSchema = mongoose.Schema({
  Time: Date,
  Description: String,
  Address: String,
  Teacher: ObjectId,
  Student: ObjectId,
});

mongoose.model("Appointments", appointmentSchema, "Appointments");
