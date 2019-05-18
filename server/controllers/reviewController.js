var mongoose = require("mongoose");
var Review = mongoose.model("Reviews");

// Function to get all the review
// var getAllReview = function(req, res) {
//   Review.find(function(err, reviews) {
//     if (!err) {
//       res.send(reviews);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// };

// Function to add one review
var addReview = function(req, res) {
  var review = new Review({
    TargetRole: req.body.TargetRole,
    Pros: req.body.Pros,
    Cons: req.body.Cons,
    CreatedBy: req.body.CreatedBy,
    ReviewerFirstName: req.body.ReviewerFirstName,
    ReviewerLastName: req.body.ReviewerLastName,
    CreatedFor: req.body.CreatedFor,
    RevieweeFirstName: req.body.RevieweeFirstName,
    RevieweeLastName: req.body.RevieweeLastName,
    Type: req.body.Type,
    CreatedTime: Date.now(),
  });
  review.save(function(err, newReview) {
    if (!err) {
      res.send(newReview);
    } else {
      res.sendStatus(400);
      res.send({
        error: err,
        status: 400
      });
    }
  });
};

// Function to delete a review based on id
var deleteReview = function(req, res) {
  var id = req.params.id;
  Review.findByIdAndDelete(id, function(err) {
    if (!err) {
      res.send({ Success: true });
    } else {
      res.sendStatus(400);
    }
  });
};

// Function to update the review based on id
var updateReview = function(req, res) {
  var id = req.params.id;
  var updates = {
    Pros: req.body.Pros,
    Cons: req.body.Cons,
  };
  var options = { omitUndefined: true };
  Review.findByIdAndUpdate(id, updates, options, function(err, updated) {
    if (!err && updated != null) {
      res.send({ Status: "Successful" });
    } else {
      res.sendStatus(400);
    }
  });
};

// Get only 10 review each request
var getReviewOfUser = function(req, res) {
  if (req.query.from === undefined || req.query.size === undefined || req.query.id === undefined){
    res.sendStatus(400);
    console.log("index, size, and user must be defined");
  }
  var index = parseInt(req.query.from);
  var size = parseInt(req.query.size);
  var user = mongoose.Types.ObjectId(req.query.id);
  var query = {"$or": [{"CreatedBy": user}, {"CreatedFor": user}]};

  Review.paginate(query, {offset: index, limit: size}, (err, result) => {
    if (!err){
      const asCreator = result.docs.filter(data => data.CreatedBy.toString() === req.query.id);
      const asReviewee = result.docs.filter(data => data.CreatedFor.toString() === req.query.id);
      console.log(asCreator);
      console.log(asReviewee);
      res.send({
        asCreator: asCreator,
        asReviewee: asReviewee,
        total: result.totalDocs
      })
    } else {
      console.log(err);
      res.sendStatus({"error": "Feedback for user not found"})
    }
  })
};

// Function to get all the review created by user
// var getAllReviewOfUser = function(req, res) {
//   var createdById = req.body.CreatedBy;
//   Review.find({ CreatedBy: createdById }, function(err, reviews) {
//     if (!err) {
//       res.send(reviews);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// };

// Function to get all the review created for the user
var getPersonalReviewOfUser = function(req, res) {
  var createdForId = req.body.CreatedFor;
  Review.find({ CreatedFor: createdForId }, function(err, reviews) {
    if (!err) {
      res.send(reviews);
    } else {
      res.sendStatus(404);
    }
  });
};

// Export the variable
// module.exports.getAllReview = getAllReview;
module.exports.addReview = addReview;
module.exports.deleteReview = deleteReview;
module.exports.updateReview = updateReview;
// module.exports.getAllReviewOfUser = getAllReviewOfUser;
module.exports.getPersonalReviewOfUser = getPersonalReviewOfUser;
module.exports.getReviewOfUser = getReviewOfUser;