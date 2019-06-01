var mongoose = require("mongoose");

// Require the model that's related for this controller
var Appointments = mongoose.model("Appointments");

// Function to find all appointments
var findAllAppointments = function(req, res) {
  var user = req.query.user;
  if (user === undefined) {
    return res.send({ error: "user ID is required" });
  }
  user = mongoose.Types.ObjectId(user);
  var query = { $or: [{ Creator: user }, { Invitee: user }] };
  Appointments.find(query, function(err, appointment) {
    if (!err) {
      res.send(appointment);
    } else {
      console.log(err);
      res.sendStatus(404);
    }
  });
};

// Function to add new appointment
var addNewAppointments = function(req, res) {
  var appointment = new Appointments({
    Time: req.body.Time,
    Description: req.body.Description,
    Address: req.body.Address,
    Invitee: req.body.Invitee,
    InviteeFirstName: req.body.InviteeFirstName,
    InviteeLastName: req.body.InviteeLastName,
    Creator: req.body.Creator,
    CreatorFirstName: req.body.CreatorFirstName,
    CreatorLastName: req.body.CreatorLastName,
    IsApproved: false,
  });
  appointment.save(function(err, appointment) {
    if (!err) {
      res.send(appointment);
    } else {
      res.sendStatus(400);
    }
  });
};

// Delete an appointment
var deleteAppointments = function(req, res) {
  var id = mongoose.Types.ObjectId(req.params.id);
  Appointments.findByIdAndDelete(id, function(err) {
    if (!err) {
      res.send({ DeletionSuccessful: true });
    } else {
      res.sendStatus(400);
    }
  });
};

// Update an appointment
var updateAppointments = function(req, res) {
  var id = req.params.id;
  var appointment = {
    Time: req.body.Time,
    Description: req.body.Description,
    Address: req.body.Address,
    // You can't change the parties involved in the invite
    // Invitee: req.body.Invitee,
    // Creator: req.body.Creator,
    IsApproved: false,
  };
  var options = { omitUndefined: true };
  Appointments.findByIdAndUpdate(id, appointment, options, function(
    err,
    updated
  ) {
    if (!err && updated != null) {
      res.send({ UpdateSuccessful: true });
    } else {
      res.sendStatus(400);
    }
  });
};

var approveAppointment = function(req, res) {
  var id = req.params.id;
  Appointments.findByIdAndUpdate(id, { IsApproved: true }, function(
    err,
    updated
  ) {
    if (!err && updated != null) {
      res.send({ UpdateSuccessful: true });
    } else {
      res.sendStatus(400);
    }
  });
};

// Export the variable
module.exports.findAllAppointments = findAllAppointments;
module.exports.addNewAppointments = addNewAppointments;
module.exports.deleteAppointments = deleteAppointments;
module.exports.updateAppointments = updateAppointments;
module.exports.approveAppointment = approveAppointment;
