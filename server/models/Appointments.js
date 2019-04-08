var mongoose = require("mongoose");

// Details of the Appointments schema
var appointmentSchema = mongoose.Schema({
  time: Date,
  description: String,
  address: String,
  teacher: ObjectId,
  student: ObjectId,
});

mongoose.model("Appointments", appointmentSchema);
