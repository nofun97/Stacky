var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

// Details of the Appointments schema
var appointmentSchema = mongoose.Schema({
  Time: Date,
  Description: String,
  Address: String,
  Creator: ObjectId,
  CreatorFirstName: String,
  CreatorLastName: String,
  Invitee: ObjectId,
  InviteeFirstName: String,
  InviteeLastName: String,
  IsApproved: Boolean,
});

mongoose.model("Appointments", appointmentSchema, "Appointments");
