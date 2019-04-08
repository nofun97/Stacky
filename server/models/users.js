var mongoose = require('mongoose');

// TODO: add details to the schema
var userSchema = mongoose.Schema(
    {
        "name":String,
        "address":String,
    }
);

mongoose.model('users',userSchema);