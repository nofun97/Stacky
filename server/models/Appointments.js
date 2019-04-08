var mongoose = require('mongoose');

// Details of the Appointments schema
var appointmentSchema = mongoose.Schema(
    {
        time : Date,
        description : String,
        address : String,
        teacher : ObjectID,
        student : ObjectID
    }
);

mongoose.model('Appointments',appointmentSchema);