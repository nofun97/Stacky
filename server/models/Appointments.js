var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

// Details of the Appointments schema
var appointmentSchema = mongoose.Schema({
  Time: Date,
  Description: String,
  Address: String,
  Creator: ObjectId,
  Invitee: ObjectId,
  IsApproved: Boolean,
});

mongoose.model("Appointments", appointmentSchema, "Appointments");
