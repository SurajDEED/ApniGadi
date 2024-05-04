
const mongoose = require('mongoose');
const initData = require("./data.js");
const dbUrl = "mongodb+srv://apni-gadi:NzuUsmSMd3lAthQt@cluster0.k3e7zff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("Connection Succesfull");
}).catch((err) => {
    console.log("Error" + err);
});
async function main() {
    await mongoose.connect(dbUrl);
}
const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "662ba48929b356d062628983" }));
    await Listing.insertMany(initData.data);
    console.log("The data was inserted");
}
initDB();