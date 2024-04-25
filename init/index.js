const mongoose = require('mongoose');
const initData = require("./data.js");
const mongoUrl = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("Connection Succesfull");
}).catch((err) => {
    console.log("Error");
});
async function main() {
    await mongoose.connect(mongoUrl);
}
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "661e4e923c73724224a0321c" }));
    await Listing.insertMany(initData.data);
    console.log("The data was inserted");
}
initDB();
