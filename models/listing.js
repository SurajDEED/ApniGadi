const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewSchema = require('./reviews');
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    years: {
        type: Number,
        min: 2003,
        required: true,
    },
    km: {
        type: Number,
        required: true,
        min: 2000,

    },
    image: {
        url: String,
        filename: String,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    seater: {
        type: String,
        required: true,
    },

    carType: {
        type: String,
        required: true,
    },

    carEngine: {
        type: String,
        required: true,
    },

    fuelType: {
        type: String,
        required: true,
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },

    rentStatus: {
        type: String,
        enum: ['booked', 'unBooked'],
    },
    address:{
        type:String,
        required: true,
    }
});

listingSchema.pre('save', function (next) {
    // console.log('Middleware triggered');
    if (!this.image || Object.keys(this.image).length === 0) {
        // console.log('No image provided, setting default image');
        this.image = {
            url: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        };
    }
    next();
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await reviewSchema.deleteMany({ _id: { $in: listing.reviews } })
    }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;



// type: String,
// validate: {
//     validator: function (v) {
//         // if (v === '') {
//         //     this.image = this.schema.path('image').default();
//         //     return true;
//         // }
//         return typeof v === 'string' || (v instanceof Object && v.hasOwnProperty('filename') && v.hasOwnProperty('url'));
//     },
//     message: 'Image must be a valid string or an object with filename and url properties',
// }

// default: "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//         set: (v) =>
//             v === ""
//                 ? "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,