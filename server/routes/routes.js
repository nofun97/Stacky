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
router.get("/user", userController.findAllUsers);
router.get("/user/:id", userController.findUserById);
router.delete("/user/:id", userController.deleteUser);
router.post("/user/:id", userController.updateProfile);


// /users?from=%d&size=%d%skill=%s
router.get("/users", userController.findNUsers);
// Should get UName from the body
router.get("/user/name", userController.findUser);
// Should get SkillName from the body
router.get("/user/skills", userController.findUserBasedOnSkills);

// Skill Model Routes
router.post("/skill", skillController.addNewSkill);
router.get("/skill", skillController.findAllSkills);
router.delete("/skill/:id", skillController.deleteSkill);
router.post("/skill/:id", skillController.updateSkill);

// Search skill based on name
router.get("/skill/:Name", auth.optional, skillController.searchSkill);

// Review Model Routes
router.get("/review", reviewController.getAllReview);
router.post("/review", reviewController.addReview);
router.delete("/review/:id", reviewController.deleteReview);
router.post("/review/:id", reviewController.updateReview);

// Should get CreatedBy from the body
router.get("/review/by", reviewController.getAllReviewOfUser);
// Should get CreatedFor from the body
router.get("/review/for", reviewController.getPersonalReviewOfUser);

// Appointment Model Routes
router.get("/appointment", appointmentController.findAllAppointments);
router.post("/appointment", appointmentController.addNewAppointments);
router.delete("/appointment/:id", appointmentController.deleteAppointments);
router.post("/appointment/:id", appointmentController.updateAppointments);

// Credentials Model Routes
router.post("/login", credentialsController.login);
router.post("/user", credentialsController.newUser);
router.get("/current", credentialsController.current);
router.get("/email/:email", credentialsController.checkExistingEmail);
// Export the router
module.exports = router;
