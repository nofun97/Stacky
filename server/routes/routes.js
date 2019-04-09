var express = require("express");
var router = express.Router();

// Require the controller for each models. (uncomment code below when the controller has been made)
var userController = require("../controllers/userController.js");
var skillController = require("../controllers/skillController.js");
var reviewController = require("../controllers/reviewController.js");
var appointmentController = require("../controllers/appointmentController.js");

// Specify Our routes here
router.get("/", function(req, res) {
  res.send("welcome to stacky website");
});

// User Model Routes
router.get("/allUser", userController.findAllUsers);
router.post('/api/register', userController.registerUser);
router.post('/api/getUser', userController.findUser);
router.delete('/api/deleteUser', userController.deleteUser);
router.post('/api/updateProfile', userController.updateProfile);
router.post('/api/getUser/skills', userController.findUserBasedOnSkills);

// Skill Model Routes
router.post('/addSkills', skillController.addNewSkill);
router.get('/getSkills', skillController.findAllSkills);
router.post('/api/searchSkills', skillController.searchSkill);

// Review Model Routes
router.get("/allReview", reviewController.getAllReview);
router.post("/addReview", reviewController.addReview);
router.delete("/deleteReview", reviewController.deleteReview);
router.post("/updateReview", reviewController.updateReview);
router.get("/reviewOfUser", reviewController.getAllReviewOfUser);
router.get("/personalReview", reviewController.getPersonalReviewOfUser);

// Appointment Model Routes
router.get("/allAppointments", appointmentController.findAllAppointments);
router.post("/addAppointment", appointmentController.addNewAppointments);
router.delete("/deleteAppointment", appointmentController.deleteAppointments);
router.post("/updateAppointment", appointmentController.updateAppointments);

// Export the router
module.exports = router;
