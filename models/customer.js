const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passpotLocalMongoose = require('passport-local-mongoose');

const customerSchema = new Schema({

    totalOrders: {
        type: Number,
        default: 0,
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})

customerSchema.plugin(passpotLocalMongoose);
module.exports = mongoose.model('Customer', customerSchema);