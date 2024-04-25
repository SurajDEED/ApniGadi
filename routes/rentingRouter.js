const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapasync.js');
const { validateReview, isLoggedIn, isAuthor, isOwner, validateListing } = require('../middleware.js');
const multer = require('multer');
const renterController = require('../controllers/renting.js');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage })


router.route('/').get(isLoggedIn, renterController.rent);
router.route('/:id/rentShow').get(isLoggedIn, renterController.AllrentShow);
router.route('/:id/rentShow/singleCar').get(isLoggedIn, renterController.singleRentShow);
router.route('/rentadd').get(isLoggedIn, renterController.renderAddRentForm).post(isLoggedIn, upload.single('rent[image]'), wrapAsync(renterController.addRent));


router.route('/:id/singleCar/edit').put(isLoggedIn, isOwner, upload.single('listing[image]'), wrapAsync(renterController.updateListing)).delete(isLoggedIn, isOwner, wrapAsync(renterController.deleteListing));

router.get("/:id/singleCar/edit", isLoggedIn, isOwner, wrapAsync(renterController.editListForm));
router.route('/:id/orders').get(isLoggedIn, renterController.orders)
router.route('/:id/orders/update').post(isLoggedIn, renterController.updateOrder)

// .post(isLoggedIn, upload.single('rent[image]'), wrapAsync(renterController.addRent));
module.exports = router;