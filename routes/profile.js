const express = require('express');
const router = express.Router();
const wrapasync = require('../utils/wrapasync');
const passport = require('passport');

const { isLoggedIn, isOwner, validateListing, validateRoute } = require('../middleware.js')
const multer = require('multer');
const profileController = require('../controllers/profile.js');
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage })

router.route('/profile').get(wrapasync(profileController.renderProfilePage));

router.route('/profile/:id').put(isLoggedIn, upload.single('profile[image]'), wrapasync(profileController.updateProfile)).get(wrapasync(profileController.renderEditPage))
module.exports = router;
