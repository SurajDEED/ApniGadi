const Listing = require('./models/listing.js')
const { listingSchema } = require('./schema.js');
const expressError = require('./utils/expressError.js');
const { reviewSchema } = require('./schema.js');
const Reviews = require('./models/reviews.js');

module.exports.isLoggedIn = (req, res, next) => {
    console.log(req.user);
    if (!req.isAuthenticated()) {
        // We have to save the path only when the user was not logged in 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Login required !! ");
        res.redirect('/login');
    }
    next();

}

// req.session.redirectUrl Passport has the access to delete this but the req.locals cannot be deleted so we store it in them so that are path is saved and we do not get a undefined error 
module.exports.sendRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirecturl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (res.locals.currUser && !list.owner._id.equals(res.locals.currUser._id)) {
        req.flash('error', "You do not have permissions to access this page");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let rev = await Reviews.findById(reviewId);
    if (res.locals.currUser && !rev.author._id.equals(res.locals.currUser._id)) {
        req.flash('error', "You have not created this review it cannot be deleted by you ! ");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((er) => er.message).join(',');
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    console.log(error);
    if (error) {
        let errMsg = error.details.map((er) => er.message).join(',');
        throw new expressError(400, errMsg);
    } else {
        next();
    }
}


module.exports.validateRoute = (req, res, next) => {
    // if (!req.user && req.user.role === 'customer') {
        next();
    // } else {
        // req.flash('error', 'Renter has not access to the customer portal')
        // res.redirect('/login');
    // }
}
