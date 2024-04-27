const Users = require('../models/users');
module.exports.renderProfilePage = async (req, res) => {

    if (res.locals.currUser) {
        console.log(res.locals.currUser + "   " + req.user._id);
        let profileId = await Users.findById(req.user._id);
        res.render('profile/profile.ejs', { profileId });
    } else {
        res.render('profile/profile.ejs');
    }
}
module.exports.updateProfile = async (req, res) => {
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
}

module.exports.renderEditPage = async (req, res) => {
    let { id } = req.params;
    const editProfile = await Users.findById(id);
    res.render('profile/profileEdit.ejs', { editProfile });
}