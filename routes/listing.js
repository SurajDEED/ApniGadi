const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapasync.js');
const { isLoggedIn, isOwner, validateListing, validateRoute } = require('../middleware.js')
const listingController = require('../controllers/listing.js');
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const Listing = require('../models/listing.js');

const upload = multer({ storage })


router.route('/')
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createNewList))

router.route('/about').get(listingController.aboutUsePage)
router.route('/order').post(validateRoute, wrapAsync(listingController.razorPayIntegrate))
router.route('/:id/placeOrder').get(isLoggedIn, wrapAsync(listingController.orderPageRender));
router.route('/orderconfirmed').post(isLoggedIn,wrapAsync(listingController.orderConfrim));
router.route('/:id/rentdetails/drivinglicence').get(isLoggedIn, validateRoute, listingController.renderDlPage)
router.route('/submit-form').post(isLoggedIn, validateRoute, wrapAsync(listingController.checkDlDetails))
router.route('/:id/myorders').get(isLoggedIn, validateRoute, wrapAsync(listingController.renderMyOrdersPage))

router.route('/:id')
    .get(wrapAsync(listingController.renderSingleList))
// router.get("/new", isLoggedIn, listingController.renderNewForm);
// The below code is trying to find the id the listings data base so if you creating any route like /listings/new it will try to find it as an id ans search in the database so we need to write this route below so that there is no error

// router.get('/:id/rent', (req, res) => {
//     console.log("Rent but")
//     res.send("Hii")
// })

// .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
// .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListForm));
// router.get("/:id/rent", isLoggedIn, wrapAsync(listingController.editListForm));

router.route('/:id/rentdetails').get(isLoggedIn, validateRoute, listingController.renderDetailsPgae).post(isLoggedIn, validateRoute, wrapAsync(listingController.submitRenderForm))

module.exports = router;


















// router.post('/:id/create-checkout-session', async (req, res) => {
//     const { id } = req.params;
//     console.log(id)
//     let car = await Listing.findById(id);
//     console.log("The car is :--> " + car)

//     let options = {
//         amount: 50000,  // amount in the smallest currency unit
//         currency: "INR",
//         receipt: "order_rcptid_11"
//     };
//     instance.orders.create(options, function (err, order) {
//         console.log(order);
//         res.send({ orderId: order.id });
//     });


{/* <button id="rzp-button1">Pay</button>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}

// const lineItem = {
//     price_data: {
//         currency: "inr",
//         product_data: {
//             name: car.title,
//             images: [car.image.url],
//         },
//         unit_amount: car.price * 100,
//     },
//     quantity: 1,
// };
// const session = await stripe.checkout.sessions.create({
//     line_items: [lineItem],
//     mode: 'payment',
//     success_url: "http://localhost:8080/success",
//     cancel_url: "http://localhost:8080/cancel",
// });

// res.redirect(303, session.url);
// res.send("This page is wroking")
// });

// router.route('/:id/rentShow').get(listingController.rentShow);
// router.route('/:id/rentShow/singleCar').get(listingController.singleRentShow);
// router.route('/rentadd').get(isLoggedIn, listingController.renderAddRentForm).post(isLoggedIn, upload.single('rent[image]'), wrapAsync(listingController.addRent));