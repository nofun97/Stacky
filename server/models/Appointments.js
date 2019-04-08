var mongoose = require("mongoose");

// Details of the Appointments schema
var appointmentSchema = mongoose.Schema({
  Time: Date,
  Description: String,
  Address: String,
  Teacher: ObjectId,
  Student: ObjectId,
});

mongoose.model("Appointments", appointmentSchema);
