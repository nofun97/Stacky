var express = require("express");
var router = express.Router();

const auth = require("./auth");

// Require the controller for each models. (uncomment code below when the controller has been made)
var userController = require("../controllers/userController.js");
var skillController = require("../controllers/skillController.js");
var reviewController = require("../controllers/reviewController.js");
var appointmentController = require("../controllers/appointmentController.js");
var credentialsController = require("../controllers/credentialsController.js");
// Specify Our routes here
// User Model Routes
router.get("/user", auth.required, userController.findAllUsers);
router.delete('/user/:id', auth.required, userController.deleteUser);
router.post('/user/:id', auth.required, userController.updateProfile);

// Should get UName from the body
router.get('/user/name', auth.required, userController.findUser);
// Should get SkillName from the body
router.get('/user/skills', auth.required, userController.findUserBasedOnSkills);

// Skill Model Routes
router.post('/skill', auth.required, skillController.addNewSkill);
router.get('/skill', auth.required, skillController.findAllSkills);
router.delete('/skill/:id', auth.required, skillController.deleteSkill);
router.post('/skill/:id', auth.required, skillController.updateSkill);

// Search skill based on name 
router.get('/skill/:Name', auth.optional, skillController.searchSkill);

// Review Model Routes
router.get("/review", auth.required, reviewController.getAllReview);
router.post("/review", auth.required, reviewController.addReview);
router.delete("/review/:id", auth.required, reviewController.deleteReview);
router.post("/review/:id", auth.required, reviewController.updateReview);

// Should get CreatedBy from the body
router.get("/review/by", auth.required, reviewController.getAllReviewOfUser);
// Should get CreatedFor from the body
router.get("/review/for", auth.required, reviewController.getPersonalReviewOfUser);

// Appointment Model Routes
router.get("/appointment", auth.required, appointmentController.findAllAppointments);
router.post("/appointment", auth.required,appointmentController.addNewAppointments);
router.delete("/appointment/:id", auth.required, appointmentController.deleteAppointments);
router.post("/appointment/:id", auth.required, appointmentController.updateAppointments);

// Credentials Model Routes
router.post("/login", auth.optional, credentialsController.login);
router.post('/user', auth.optional, credentialsController.newUser);
router.get("/current", auth.required, credentialsController.current);
// Export the router
module.exports = router;