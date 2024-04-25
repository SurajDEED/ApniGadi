const express = require('express');
const router = express.Router();
const wrapasync = require('../utils/wrapasync');
const passport = require('passport');
const Users = require('../models/users');
const multer = require('multer');
const { storage } = require('../cloudConfig.js')
const upload = multer({ storage })

router.get('/profile', wrapasync(async (req, res) => {
    if (res.locals.currUser) {
        console.log(res.locals.currUser + "   " + req.user._id);
        let profileId = await Users.findById(req.user._id);
        res.render('profile/profile.ejs', { profileId });
    } else {
        res.render('profile/profile.ejs');
    }
}));

router.put('/profile/:id', upload.single('profile[image]'), wrapasync(async (req, res) => {
    let { id } = req.params;
    console.log(req.body.profile);
    let newUser = await Users.findByIdAndUpdate(id, { ...req.body.profile });
    console.log("The new user is :--> " + newUser);
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        newUser.image = { url, filename };
        await newUser.save();
    }
    req.flash("success", "Profile Updated !");
    res.redirect('/account/profile');
}))


router.get('/profile/:id', wrapasync(async (req, res) => {
    let { id } = req.params;
    const editProfile = await Users.findById(id);
    res.render('profile/profileEdit.ejs', { editProfile });
}));



module.exports = router;
