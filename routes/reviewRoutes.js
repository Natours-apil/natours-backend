const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

const Router = express.Router();

Router.route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.createReview);

module.exports = Router;
