const express = require('express');

const tourController = require('../controllers/tourController');

const Router = express.Router();

// Router.param('id', tourController.checkID);

Router.route('/top-5-cheap').get(
  tourController.aliasTopTours,
  tourController.getAllTours
);

Router.route('/tour-status').get(tourController.getTourStats);
Router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

Router.route('/').get(tourController.getAllTours).post(
  // tourController.checkBody,
  tourController.createTour
);

Router.route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = Router;
