const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passpotLocalMongoose = require('passport-local-mongoose');

// We are not adding username and passowrd in the scehma because 
// You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
// passportLocalMongoose this will be used as a plugin to add usename and password with hashes and salts 

// It also provides some methods have a look a the passport-local-mongoose (Documentation)

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },

    image: {
        url: String,
        filename: String,
    },

    mobileNo: {
        type: Number,
        required: true,
    },

    age: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 18;
            },
            message: 'Age must be at least 18.'
        }
    },
    role: {
        type: String,
        enum: ['renter', 'customer'],
    },
})

// const User = new Schema({});
// We need to pass this plugin in any case 
userSchema.plugin(passpotLocalMongoose);
module.exports = mongoose.model('User', userSchema);