const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    carId: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    customer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    pickUpDate: {
        type: String,
        required: true,
    },
    dropDate: {
        type: String,
        required: true,
    },
    dlDetails: {
        dlNumber: {
            type: String,
        },
        dob: {
            type: String,
        }
    },

    status: {
        type: String,
        enum: ['Processing', 'Processed'],
        default: 'Processing'

    }
});

module.exports = mongoose.model("Order", orderSchema);