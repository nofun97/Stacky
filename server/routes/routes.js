var express = require("express");
var router = express.Router();

const auth = require("./auth");
const passport = require("passport");
// Require the controller for each models. (uncomment code below when the controller has been made)
var userController = require("../controllers/userController.js");
var skillController = require("../controllers/skillController.js");
var reviewController = require("../controllers/reviewController.js");
var appointmentController = require("../controllers/appointmentController.js");
var credentialsController = require("../controllers/credentialsController.js");
// Specify Our routes here
// User Model Routes
router.get("/user", auth.ensureAuthenticated, userController.findAllUsers);
router.get("/user/:id", auth.ensureAuthenticated, userController.findUserById);
router.delete("/user/:id", auth.ensureAuthenticated, userController.deleteUser);
router.post(
  "/user/:id",
  auth.ensureAuthenticated,
  userController.updateProfile
);

// /users?from=%d&size=%d%skill=%s
router.get("/users", auth.ensureAuthenticated, userController.findNUsers);
// Should get SkillName from the body
router.get(
  "/user/skills",
  auth.ensureAuthenticated,
  userController.findUserBasedOnSkills
);

// Skill Model Routes
router.post("/skill", auth.ensureAuthenticated, skillController.addNewSkill);
router.get("/skill", auth.ensureAuthenticated, skillController.findAllSkills);
router.delete(
  "/skill/:id",
  auth.ensureAuthenticated,
  skillController.deleteSkill
);
router.post(
  "/skill/:id",
  auth.ensureAuthenticated,
  skillController.updateSkill
);

// Search skill based on name
router.get(
  "/skill/:Name",
  auth.ensureAuthenticated,
  skillController.searchSkill
);

// Review Model Routes
router.get("/review", auth.ensureAuthenticated, reviewController.getAllReview);
router.post("/review", auth.ensureAuthenticated, reviewController.addReview);
router.delete(
  "/review/:id",
  auth.ensureAuthenticated,
  reviewController.deleteReview
);
router.post(
  "/review/:id",
  auth.ensureAuthenticated,
  reviewController.updateReview
);

// Should get CreatedBy from the body
router.get(
  "/review/by",
  auth.ensureAuthenticated,
  reviewController.getAllReviewOfUser
);
// Should get CreatedFor from the body
router.get(
  "/review/for",
  auth.ensureAuthenticated,
  reviewController.getPersonalReviewOfUser
);

// Appointment Model Routes
router.get(
  "/appointment",
  auth.ensureAuthenticated,
  appointmentController.findAllAppointments
);
router.post(
  "/appointment",
  auth.ensureAuthenticated,
  appointmentController.addNewAppointments
);
router.delete(
  "/appointment/:id",
  auth.ensureAuthenticated,
  appointmentController.deleteAppointments
);
router.post(
  "/appointment/:id",
  auth.ensureAuthenticated,
  appointmentController.updateAppointments
);
router.post(
  "/appointment/approve/:id",
  auth.ensureAuthenticated,
  appointmentController.approveAppointment
);

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.send({
    Email: req.user.Email,
    FirstName: req.user.FirstName,
    LastName: req.user.LastName,
    DOB: req.user.DOB,
    IsVerified: req.user.IsVerified,
    Address: req.user.Address,
    Skills: req.user.Skills,
    Interests: req.user.Interests,
    _id: req.user._id,
  });
});
router.post(
  "/register",
  userController.registerUser,
  passport.authenticate("local"),
  (req, res) => {
    res.send({
      Email: req.user.Email,
      FirstName: req.user.FirstName,
      LastName: req.user.LastName,
      DOB: req.user.DOB,
      IsVerified: req.user.IsVerified,
      Address: req.user.Address,
      Skills: req.user.Skills,
      Interests: req.user.Interests,
      _id: req.user._id,
    });
  }
);
router.get("/current", credentialsController.current);
router.get("/email/:email", credentialsController.checkExistingEmail);
// Export the router
module.exports = router;
