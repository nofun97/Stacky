var mongoose = require("mongoose");

// Require the model that's related for this controller
var Appointments = mongoose.model("Appointments");

// Define the function to be used (create, remove, update, findall, etc.)

// Method to find all appointments
var findAllAppointments = function(req, res) {
  Appointments.find(function(err, appointment) {
    if (!err) {
      res.send(appointment);
    } else {
      res.sendStatus(404);
    }
  });
};

// Method to add new appointment
var addNewAppointments = function(req, res) {
  var appointment = new Appointments({
    Time: req.body.Time,
    Description: req.body.String,
    Address: req.body.String,
    Teacher: req.body.Teacher,
    Student: req.body.Student,
  });
  skill.save(function(err, appointment) {
    if (!err) {
      res.send(appointment);
    } else {
      res.sendStatus(400);
    }
  });
};

// Delete an appointment
var deleteAppointments = function(req,res){
  Appointments.findByIdAndDelete(id, function(err){
    if (!err) {
      res.send({DeletionSuccessful : true});
    } else {
      res.sendStatus(400);
    }
  });
    
};

// Update an appointment
var updateAppointments = function(req,res){
  var appointment = {
      Time: req.body.Time,
      Description: req.body.String,
      Address: req.body.String,
      Teacher: req.body.Teacher,
      Student: req.body.Student,
    };
  Appointments.findByIdAndUpdate(id, appointment, function(err){
    if (!err) {
      res.send({UpdateSuccessful : true});
    } else {
      res.sendStatus(400);
    }
  });
    
};


// Export the variable
module.exports.findAllAppointments= findAllAppointments;
module.exports.addNewAppointments = addNewAppointments;
module.exports.deleteAppointments = deleteAppointments;
module.exports.updateAppointments = updateAppointments;
