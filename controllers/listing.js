const Listing = require('../models/listing.js');
const Owner = require('../models/owner.js');
const User = require('../models/users.js');
const Orders = require('../models/orders.js');
const axios = require('axios');
const Razorpay = require('razorpay');
const { DLKEY } = process.env;
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILO_NUMBER;

module.exports.index = async (req, res) => {
    const totalListing = await Listing.find({});
    res.render("listing/mainpage.ejs", { totalListing });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listing/takeList.ejs");
}

module.exports.renderSingleList = async (req, res) => {
    let { id } = req.params;
    console.log(id)
    const singleList = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate({ path: "owner" });

    console.log("The single list is " + singleList);
    // let User = await Owner.findById(singleList.owner._id).populate('userId');
    // console.log("The user id is " + User);
    // console.log("The user id is " + User.userId.name);


    if (!singleList) {
        req.flash("error", "Listing you requested for does not exist !");
        res.redirect('/listings');
    }
    // console.log(singleList);
    res.render("listing/singlepage.ejs", { singleList });

}

module.exports.createNewList = async (req, res) => {
    // let {title,desc,img,price,country,location } = req.body;
    // or
    // if (!req.body.listing) {
    //     throw new expressError(400, "Send valid data for listing");
    // }
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(url + ".." + filename);
    let list = new Listing(req.body.listing);
    list.owner = req.user._id;
    list.image = { url, filename };
    await list.save();
    req.flash("success", "New Listings Created !");
    res.redirect("/listings");
}

module.exports.renderDetailsPgae = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
    let car = await Listing.findById(id).populate({ path: "owner" });
    console.log("The id is" + car);

    let renterDet = await Owner.findOne({ userId: car.owner.id })
    console.log(renterDet)
    res.render('listing/details.ejs', { car, renterDet });
}

module.exports.submitRenderForm = async (req, res) => {
    console.log(req.body);
    let { customerAddress, city, state, pickUpDate, dropDate } = req.body;
    console.log(typeof (pickUpDate));
    let pickD = new Date(pickUpDate);
    let dropD = new Date(dropDate);
    let timeDiff = dropD.getTime() - pickD.getTime();
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log("Difference in days:", diffDays);
    const { id } = req.params;
    let car = await Listing.findById(id).populate('owner');
    console.log(car.id)
    let carId = car.id;
    let owner = car.owner.id;
    let customer = req.user._id
    console.log(car.owner.id)
    console.log(req.user._id);
    let amount = car.price * diffDays;
    console.log(amount);

    try {
        req.session.orderDetails = { customerAddress, city, state, pickUpDate, dropDate, amount, carId, owner, customer, id }
        console.log(req.session.orderDetails);
        res.redirect(`/listings/${car.id}/rentdetails/drivinglicence`)
    } catch (e) {
        console.log('error ' + e)

    }
}
module.exports.renderDlPage = (req, res) => {
    res.render('listing/dlverify.ejs');
}

module.exports.checkDlDetails = async (req, res) => {
    let id = req.session.orderDetails.id;
    let dlNumber = req.body.drivel.toUpperCase();
    let dob = req.body.dldate;
    let dlS = validateDLNumber(dlNumber);
    let dlDate = validateDate(req.body.dldate);
    if (dlS && dlDate) {
        console.log(req.session.orderDetails);
        let data = JSON.stringify({
            "id_number": req.body.drivel,
            "dob": req.body.dldate
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://kyc-api.surepass.io/api/v1/driving-license/driving-license',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': DLKEY
            },
            data: data
        };
        axios.request(config)
            .then(async (response) => {
                console.log(JSON.stringify(response.data));
                console.log("The request status is :--> " + JSON.stringify(response.data.success))
                console.log(JSON.stringify(response.data.success))
                if (response.data.success === true) {

                    req.session.orderDetails = {
                        ...req.session.orderDetails,
                        dlDetails: {
                            dlNumber: dlNumber,
                            dob: dob,
                        }

                    }
                    let details = req.session.orderDetails;
                    // console.log(details)
                    console.log("The order is " + details);
                    const serializedOrder = JSON.stringify(details);

                    res.cookie('order', serializedOrder, {
                        maxAge: 86400000,
                        httpOnly: true
                    });

                    console.log(req.cookies.order);
                    // await order.save();
                    // const orderId = order._id;
                    // console.log("The order id is from the dl page " + orderId);
                    console.log("Verfied Everything now")
                    res.redirect(`/listings/${id}/placeOrder`);
                }
            })
            .catch((error) => {
                console.log(error);
                req.flash('error', "Driving License Verification Failed Order Cancelled !")
                res.redirect(`/listings/${id}/`)

            });
    } else {
        req.flash('error', "Driving License should be in this format DLXXXXXXXXXXXXX ");
        let id = req.session.orderDetails.id;
        res.redirect(`/listings/${id}/rentdetails/drivinglicence`)
    }
}

function validateDLNumber(dlNumber) {
    console.log("Dl Called")
    const states = [
        "AA", "AP", "AR", "AS", "BR", "CH", "CG", "DD", "DL", "DN",
        "GA", "GJ", "HR", "HP", "JK", "JH", "KA", "KL", "LA", "LD",
        "MH", "ML", "MN", "MP", "MZ", "NL", "OR", "PB", "PY", "RJ",
        "SK", "TN", "TR", "UP", "UT", "WB"
    ];
    let regexPattern = new RegExp(`^(${states.join('|')})\\d{13}$`);
    console.log(regexPattern.test(dlNumber));
    return regexPattern.test(dlNumber);
}

function validateDate(dob) {
    console.log("Date called")
    let dobDate = new Date(dob);
    let currentDate = new Date();
    let ageDifference = currentDate.getFullYear() - dobDate.getFullYear();
    if (currentDate.getMonth() < dobDate.getMonth() ||
        (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate())) {
        ageDifference--;
    }
    console.log(ageDifference);
    return ageDifference >= 18;
}

module.exports.orderPageRender = async (req, res) => {
    const orderCookie = req.cookies.order;
    console.log("The order cookiee is " + orderCookie);
    const orderDet = JSON.parse(orderCookie);
    console.log(orderDet)
    let carId = await Listing.findById(orderDet.carId);
    console.log(carId);

    let owner = await User.findById(orderDet.owner);
    console.log(owner);

    let customer = await User.findById(orderDet.customer);
    console.log(customer);
    res.render('listing/placeorder.ejs', { carId, owner, customer, orderDet, env: process.env });
}


module.exports.orderConfrim = async (req, res) => {
    console.log("Hiii")
    const orderCookie = req.cookies.order;
    console.log("The order cookiee is " + orderCookie);
    const orderDet = JSON.parse(orderCookie);
    let order = new Orders(orderDet);
    console.log("Ne order created " + order);
    order.save();
    let listId = order.carId._id;
    let list = await Listing.findById(listId);
    console.log("The list is" + list.rentStatus)
    list.rentStatus = 'booked'
    list.save();
    console.log("Now the new list is" + list)
    let ownerId = order.owner._id;
    let customerId = order.customer._id;
    let renter = await User.findById(ownerId);
    let customer = await User.findById(customerId);
    const countryCode = '+91';
    const renterNumber = countryCode + renter.mobileNo.toString();
    await twilioClient.messages.create({
        body: `Hi, ${renter.name} you have an order from ${customer.name}, please contact ${customer.name} PhNo: ${customer.mobileNo} `,
        from: twilioPhoneNumber,
        to: renterNumber
    });

    const customerNumber = countryCode + customer.mobileNo.toString();
    await twilioClient.messages.create({
        body: `Hi, ${customer.name} your order is placed successfully. We will get back to you shortly. For more updates regarding your car call on  ${renter.mobileNo}`,
        from: twilioPhoneNumber,
        to: customerNumber
    });

    res.redirect(`/listings/${order.customer._id}/myorders`)
}


module.exports.razorPayIntegrate = async (req, res) => {
}

module.exports.renderMyOrdersPage = async (req, res) => {
    let cust = req.user._id;
    let orderDet = await Orders.find({ customer: cust });
    console.log(orderDet);
    let popOrderDet = await populateOrders(orderDet);
    console.log(popOrderDet);
    // console.log(popOrderDet.carId._id);

    // let newList = await Listing.findByIdAndUpdate(popOrderDet.carId, { rentStatus: 'booked' });
    res.render('listing/allorders.ejs', { popOrderDet });
}

async function populateOrders(orders) {
    try {
        const populatedOrders = await Promise.all(orders.map(async (order) => {
            const populatedOrder = await Orders.findById(order._id)
                .populate('carId')
                .populate('owner')
                .populate('customer')
            return populatedOrder;
        }));
        return populatedOrders;
    } catch (error) {
        console.error(error);
        throw new Error('Error populating orders');
    }
}

module.exports.aboutUsePage = (req, res) => {
    res.render('listing/aboutus.ejs');
}
