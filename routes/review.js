const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapasync.js');
const { validateReview, isLoggedIn, isAuthor } = require('../middleware.js');
const reviewController = require('../controllers/reviews.js');



// Reviews Post Request
router.post('/', isLoggedIn, wrapAsync(reviewController.addReview));
// Delete Review Route
router.delete('/:reviewId', isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));
module.exports = router;
