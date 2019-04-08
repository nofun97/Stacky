var mongoose = require('mongoose');

// Require the model that's related for this controller
var User = mongoose.model('users');

// Define the function to be used (create, remove, update, findall, etc.)
var findAllusers = function(req,res){
    User.find(function(err,users){
        if(!err){
            res.send(users);
        }else{
            res.sendStatus(404);
        }
    });
};

// Export the variable
module.exports.findAllusers = findAllusers;
