var mongoose = require("mongoose");
var Review = mongoose.model("Reviews");

// Function to get all the review
var getAllReview = function(req, res) {
  Review.find(function(err, reviews) {
    if (!err) {
      res.send(reviews);
    } else {
      res.sendStatus(404);
    }
  });
};

// Function to add one review
var addReview = function(req, res) {
  var review = new Review({
    TargetRole: req.body.TargetRole,
    Pros: req.body.Pros,
    Cons: req.body.Cons,
    CreatedBy: req.body.CreatedBy,
    CreatedFor: req.body.CreatedFor,
    CreatedTime: Date.now(),
  });
  review.save(function(err, newReview) {
    if (!err) {
      res.send(newReview);
    } else {
      res.sendStatus(400);
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
  Review.findByIdAndUpdate(id, updates, options, function(err, updatedReview) {
    if (!err) {
      res.send(updatedReview);
    } else {
      res.sendStatus(400);
    }
  });
};

// Get only 10 review each request
var getReviewOfUser = function(req, res) {};

// Function to get all the review created by user
var getAllReviewOfUser = function(req, res) {
  var createdById = req.body.CreatedBy;
  Review.find({ CreatedBy: createdById }, function(err, reviews) {
    if (!err) {
      res.send(reviews);
    } else {
      res.sendStatus(404);
    }
  });
};

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
module.exports.getAllReview = getAllReview;
module.exports.addReview = addReview;
module.exports.deleteReview = deleteReview;
module.exports.updateReview = updateReview;
module.exports.getAllReviewOfUser = getAllReviewOfUser;
module.exports.getPersonalReviewOfUser = getPersonalReviewOfUser;
