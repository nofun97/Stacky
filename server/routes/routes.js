var express = require('express');
var router = express.Router();

// Require the controller for each models. (uncomment code below when the controller has been made)
var userController = require('../controllers/userController.js');
var skillController = require('../controllers/skillController.js');

// Specify Our routes here
router.get('/',function (req,res){
    res.send("welcome to stacky website")
})

// User Model Routes
router.get('/allUser', userController.findAllUsers);


// Skill Model Routes
router.post('/addSkills', skillController.addNewSkills);
router.get('/getSkills', skillController.findAllSkills);


// Review Model Routes


// Appointment Model Routes


// Export the router
module.exports = router;