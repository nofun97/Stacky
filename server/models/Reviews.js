var mongoose = require('mongoose');

// Details of the reviews schema
var reviewSchema = mongoose.Schema(
    {
        teacherPros : String,
        teacherCons : String,
        studentPros : String,
        studentCons : String,
        createdBy   : ObjectID,
        createdFor  : ObjectID,
        CreatedTime : Date
    }
);

mongoose.model('Reviews',reviewSchema);