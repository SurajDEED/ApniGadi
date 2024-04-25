const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ownerSchema = new Schema({

    rentingExperience: {
        type: Number,
        default: 0,
        required: true,
    },
    totalRents: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})
module.exports = mongoose.model('Owner', ownerSchema);