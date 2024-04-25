const Listing = require('../models/listing');
const Review = require('../models/reviews.js');

module.exports.addReview = async (req, res) => {
    console.log(req.body);
    let revlisting = await Listing.findById(req.params.id);
    console.log(revlisting)
    try {
        console.log(req.body.reviews)
    } catch (e) {
        console.log(e);
    }

    let newReview = new Review({
        rating: req.body.reviews.rating,
        comment: req.body.reviews.comment,
        author: req.user._id
    });

    revlisting.reviews.push(newReview);
    await newReview.save();
    await revlisting.save();

    req.flash("success", "Review Created !");
    res.redirect(`/listings/${revlisting._id}`);
}

module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted !");
    res.redirect(`/listings/${id}`);
}