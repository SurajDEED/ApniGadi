if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";
const path = require('path');
const methodOveride = require("method-override");
const ejsMate = require("ejs-mate");
const cookieParser = require('cookie-parser');
const expressError = require('./utils/expressError.js');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;


const listingsRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const usersRouter = require('./routes/users.js');
const profileRouter = require('./routes/profile.js');
const rentingRouter = require('./routes/rentingRouter.js');
let bodyParser = require("body-parser");



const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const passppot = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/users.js');
const Owner = require('./models/owner.js');
const { error } = require('console');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOveride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const dbUrl = process.env.ATLASDB

main().then(() => {
    console.log("Connection Succesfull");
}).catch((err) => {
    console.log("Error");
});

async function main() {
    await mongoose.connect(dbUrl);
}

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.DBSEC,
    },
    touchAfter: 24 * 3600,
})

store.on('error', () => {
    console.log("Error in MONGO SESSION store " + err);
})
const sessionOptions = {
    store,
    secret: process.env.DBSEC, resave: false, saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,

    }
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passppot.initialize());
app.use(passppot.session());

passppot.use(new localStrategy(User.authenticate()));
passppot.serializeUser(User.serializeUser());
passppot.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
    res.render('mainpage/mainpage.ejs')
})

app.use((req, res, next) => {

    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    // console.log(res.locals.currUser);
    next();

})

app.post('/order', async (req, res) => {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const options = req.body;
        console.log(req.body)
        const order = await razorpay.orders.create(options);

        if (!order) {
            return res.status(500).send('Error');
        }
        res.json(order);
    } catch (e) {
        console.log(e);
    }

})


app.use('/listings', listingsRouter);
app.use('/renter', rentingRouter);
app.use('/listings/:id/review', reviewRouter);
app.use('/account', profileRouter);
app.use('/', usersRouter);
// If no route matches then i comes here and the page not found error is displayed to the user
app.use((err, req, res, next) => {
    let { statuscode = 500, message = "Somthing Went Wrong !" } = err;
    console.log(err.name);
    console.log(err);
    res.status(statuscode).render("error.ejs", { err });
    // res.status(statuscode).send(message);

})

app.listen(8080, () => {
    console.log('Server is listining port 8080')
})

