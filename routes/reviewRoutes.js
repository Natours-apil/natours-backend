const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const Router = express.Router({
  mergeParams: true,
});

// get,post /tour/:id/reviews/:reviewId

Router.route('/')
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo('user'),
    reviewController.createReview
  );

module.exports = Router;
