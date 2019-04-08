var express = require('express');
var router = express.Router();

// Require the controller for each models. (uncomment code below when the controller has been made)
// var userController = require('../controllers/userController.js');
// var eventController = require('../controllers/eventController.js');

// Specify Our routes here
router.get('/',function (req,res){
    res.send("welcome to stacky website")
})

// Export the router
module.exports = router;