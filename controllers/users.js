const User = require('../models/users.js');
const Owner = require('../models/owner.js');
const Customer = require('../models/customer.js');
const otpGenerator = require('otp-generator')
const twilio = require('twilio');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTHTOKEN;
const twilioClient = twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILO_NUMBER;


module.exports.renderSignUpPage = (req, res) => {
    res.render('users/signup.ejs');
}

module.exports.renderUserSignUpPage = (req, res) => {
    res.render('users/userSignup.ejs')
}

module.exports.renderRenterSignUpPage = (req, res) => {
    res.render('users/renterSignup.ejs')
}

module.exports.createUser = async (req, res, next) => {
    let registredUser;
    let url = req.file.path;
    let filename = req.file.filename;
    // console.log(req.file);
    // console.log(url + " " + filename);
    try {
        let { name, username, image, email, password, age, mobileNo } = req.body;
        req.session.userData = { name, username, image: { filename, url }, age, email, password, mobileNo, role: "customer", totalOrders: 0 };
        console.log("The session data is " + req.session.userData);
        req.session.otpTimes = 0;
        // const newUser = new User({ name, email, image: { url, filename }, username, mobileNo, totalOrders: 0 });
        // registredUser = await User.register(newUser, password);
        // console.log("The registred user is " + registredUser);
        // req.login(registredUser, (err) => {
        //     console.log("The user id is " + req.user._id);
        //     if (err) {
        //         return next(err);
        //     }
        //     req.flash('success', "User was registered successfully please verify your otp for account activation");
        res.redirect('/otpverification');
        // });

    } catch (e) {
        // req.flash('error', e.message);
        console.log(e);
        res.redirect('/signup');
    }
}


module.exports.createRenter = async (req, res, next) => {
    let registredUser;
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(req.file);
    console.log(url + " " + filename);
    try {
        let { name, username, image, rentingExperience, email, password, age, mobileNo, } = req.body;
        req.session.userData = { name, username, image: { filename, url }, email, age, rentingExperience, password, mobileNo, role: "renter" };
        console.log("The session data is " + req.session.userData);
        req.session.otpTimes = 0;

        // const userData = {
        //     name,
        //     username,
        //     image,
        //     rentingExperience,
        //     email,
        //     password,
        //     mobileNo,
        //     identity: "User"
        // };
        // const renterDet = JSON.stringify(userData);
        // localStorage.setItem("userData", renterDet);
        // const newUser = new Owner({ name, email, image: { url, filename }, username, mobileNo, rentingExperience });
        // registredUser = await Owner.register(newUser, password);
        // console.log("The registered user is " + registredUser);
        // req.login(registredUser, (err) => {
        //     console.log("The user id is " + req.user._id);
        //     if (err) {
        //         return next(err);
        //     }
        //     req.flash('success', "Renter was registered successfully please verify your otp for account activation");
        res.redirect('/otpverification');
        // });

    } catch (e) {
        req.flash('error', e.message);
        console.log(e)
        // res.redirect('/signup');
    }
}

module.exports.verifyOtpPage = async (req, res) => {
    try {
        req.session.otpTimes = req.session.otpTimes + 1;
        console.log("Entered the of block of otp means this is the first visit")
        otpGen = otpGenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: true, digits: false, specialChars: false });
        console.log(otpGen);
        const otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000);
        req.session.otp = { otpGen, otpExpiresAt };
        const countryCode = '+91';
        const formattedPhoneNumber = countryCode + req.session.userData.mobileNo.toString();
        await twilioClient.messages.create({
            body: `Your OTP for creating your account is: ${otpGen}`,
            from: twilioPhoneNumber,
            to: formattedPhoneNumber
        });
        console.log("The session data from the otp page is  " + JSON.stringify(req.session.userData));
        // if (req.user._id) {
        // console.log("The id from the OPT page is " + req.user._id)
        // const user = await User.findById(req.user._id);
        // console.log(user);
        // user.otp = otpGen;
        // user.otpExpiresAt = new Date(Date.now() + 1 * 60 * 1000);
        // await user.save();
        // 
        // }
        res.render('users/otp.ejs')
    }
    catch (e) {
        console.log(e);
    }
}

module.exports.verifyOtp = async (req, res) => {
    try {
        let otpNum = req.body.otp;
        console.log(otpNum.al1);
        let strOtpNum = otpNum.al1.join('');
        console.log(strOtpNum);
        const otpExpiresAt = new Date(req.session.otp.otpExpiresAt);
        const currentTime = new Date();
        if (req.session.otpTimes <= 2) {
            if (req.session.otp.otpGen === strOtpNum && otpExpiresAt > currentTime) {
                if (req.session.userData.role === "renter") {
                    console.log("Owner Detected");
                    const UserData = req.session.userData;
                    const { name, email, image, username, mobileNo, rentingExperience, password, age, role } = UserData;
                    const newUser = new User({ name, email, image, username, mobileNo, password, age, role });
                    console.log("The new owner is :--> " + newUser)
                    let registredUser = await User.register(newUser, password);
                    console.log(registredUser);
                    const userId = registredUser._id;
                    console.log("The is is " + userId)
                    try {
                        const newRenter = new Owner({ rentingExperience, userId })
                        await newRenter.save();
                        console.log("The new renter is " + newRenter);
                    } catch (e) {
                        console.log(e);

                    }

                    req.login(registredUser, (err) => {
                        if (err) {
                            return next(err);
                        }
                        req.flash('success', "Renter was registered successfully !!");
                        res.redirect('/listings');
                    })
                } else if (req.session.userData.role === "customer") {
                    console.log("User Detected");
                    const UserData = req.session.userData;
                    const { name, email, image, username, mobileNo, password, age, role } = UserData;
                    const newUser = new User({ name, email, image, username, mobileNo, age, role });
                    console.log("The new user is :--> " + newUser)
                    let registredUser = await User.register(newUser, password);
                    const userId = registredUser._id;

                    try {
                        const registerCustomer = new Customer({ userId })
                        await registerCustomer.save();
                        console.log(registerCustomer)
                        req.flash('success', "User was registered successfully !!");
                        res.redirect('/login');

                    } catch (e) {
                        console.log(e);
                    }
                    // console.log("The registered customer is :--> " + registerCustomer);
                    // req.login(registredUser, (err) => {
                    //     if (err) {
                    //         return next(err);
                    //     }
                    // })
                }

            } else {
                res.redirect('otpverification')
            }
        } else {
            console.log("Too many attemts please try agian later");
            req.flash('error', "Too many attemts please try again later")
            res.redirect('/signup')
        }
        // const user = await User.findById(req.user._id);
        // console.log(user);
        // if (user) {
        //     const currentTime = new Date();
        //     const isNotExpired = user.otpExpiresAt && (user.otpExpiresAt > currentTime) && (user.otpExpiresAt - currentTime <= (1 * 60 * 1000));
        //     console.log(user.otp)
        //     console.log("The otp enterd in form is " + strOtpNum);
        //     const userOtpString = user.otp.toString();
        //     if (userOtpString === strOtpNum && isNotExpired) {
        //         console.log("Entered here");
        //         req.flash('success', "User saved successfully");
        //         res.redirect("/listings");
        //     } else {
        //         req.flash('error', "The otp does not match or it would have expired please try to signup again");
        //         await User.deleteOne({ _id: req.user._id });
        //         res.redirect("/listings");
        //     }
        // }

    } catch (e) {
        req.flash('error', "some error occured");

    }

}

module.exports.renderLoginPage = (req, res) => {
    res.render('users/login.ejs');
}

module.exports.login = async (req, res) => {
    req.flash("success", "You have logged in succesfully");
    console.log("THIS IS FROM THE LOGIN POST" + req.user);
    const id = req.user._id;
    if (res.locals.redirecturl) {
        res.redirect(res.locals.redirecturl);
    } else {
        if (req.user.role === 'renter') {
            res.redirect(`/renter`);
        } else {
            res.redirect('/listings');
        }
    }
}


module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', "You are logged out now !");
        res.redirect('/listings');
    })
}