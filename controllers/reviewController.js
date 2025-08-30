const apiFeatures = require('../utils/apiFeatures');
const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getAllReviews = catchAsync(async (req, res, next) => {
  const features = new apiFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;
  console.log(reviews, req.query);

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

const createReview = catchAsync(async (req, res, next) => {
  //This is my implementation of a user only being able to review a tour once

  // const existingReview = await Review.findOne({
  //   tour: req.body.tour,
  //   user: req.user.id,
  // });

  // if (existingReview) {
  //   return next(new AppError('You have already reviewed this tour', 400));
  // }

  //Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      review: newReview,
    },
  });
});

module.exports = {
  getAllReviews,
  createReview,
};
