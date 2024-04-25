const express = require('express');
const router = express.Router();
const wrapasync = require('../utils/wrapasync');
const passport = require('passport');
const { sendRedirectUrl } = require('../middleware.js');
const userController = require('../controllers/users.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage })


router.route('/signup')
    .get(userController.renderSignUpPage)


router.route('/signup/renterSign').get(userController.renderRenterSignUpPage).post(upload.single('profileimage'), wrapasync(userController.createRenter));

router.route('/signup/userSign').get(userController.renderUserSignUpPage).post(upload.single('profileimage'), wrapasync(userController.createUser));

router.route('/login')
    .get(userController.renderLoginPage)
    .post(sendRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), wrapasync(userController.login));

router.route('/otpverification').get(userController.verifyOtpPage).post(userController.verifyOtp);

router.get('/logout', userController.logout)
module.exports = router;
