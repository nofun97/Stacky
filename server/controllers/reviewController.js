var mongoose = require("mongoose");

// Require the model that's related for this controller
var Review = mongoose.model("Reviews");

// Define the function to be used (create, remove, update, findall, etc.)
var getAllReview = function(req, res) {
  Review.find(function(err, reviews) {
    if (!err) {
      res.send(reviews);
    } else {
      res.sendStatus(404);
    }
  });
};

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

var deleteReview = function(req, res) {
  var id = req.body.id;
  Review.findByIdAndDelete(id, function(err) {
    if (!err) {
      res.send({ Success: true });
    } else {
      res.sendStatus(400);
    }
  });
};

var updateReview = function(req, res) {
  var id = req.body.id;
  var updates = {
    Pros: req.body.Pros,
    Cons: req.body.Cons,
  };
  Review.findByIdAndUpdate(id, updates, function(err, updatedReview) {
    if (!err) {
      res.send(updatedReview);
    } else {
      res.sendStatus(400);
    }
  });
};

// Get only 10 review each request
var getReviewOfUser = function(req, res) {};

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
