const express = require('express');
const router = express.Router();
const ctrlLocations = require('../controllers/locations');
const ctrlReviews = require('../controllers/reviews');

//Locations
router
    .route('/locations')
    .get(ctrlLocations.getListLocations)
    .post(ctrlLocations.createLocation);
router
    .route('/locations/:locationId')
    .get(ctrlLocations.getLocationById)
    .put(ctrlLocations.updateLocationById)
    .delete(ctrlLocations.deleteLocationById);

//Reviews
router
    .route('/locations/:locationId/reviews')
    .post(ctrlReviews.createReview);
router
    .route('/locations/:locationId/reviews/:reviewId')
    .get(ctrlReviews.getReviewById)
    .put(ctrlReviews.updateReviewById)
    .delete(ctrlReviews.deleteReviewById);

module.exports= router;