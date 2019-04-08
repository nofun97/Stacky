var mongoose = require('mongoose');

// TODO: add details to the schema
var userSchema = mongoose.Schema(
    {
        "FirstName":String,
        "Address":String,
    }
);

mongoose.model('Users',userSchema);