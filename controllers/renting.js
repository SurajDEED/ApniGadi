const Listing = require('../models/listing');
const Order = require('../models/orders');

module.exports.rent = async (req, res) => {
    let id = req.user.id;
    console.log(id);
    const singleList = await Listing.find({ owner: id }).populate("owner");
    console.log(singleList)
    // res.render('renters/showallrent.ejs', { singleList });
    res.render('renters/rentermain.ejs', { id: id });
}

module.exports.AllrentShow = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const singleList = await Listing.find({ owner: id }).populate("owner");
    // res.render('renters/showallrent.ejs', { singleList });
    res.render('renters/showallrent.ejs', { singleList });
}
module.exports.singleRentShow = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const singleList = await Listing.findOne({ _id: id }).populate('owner');
    console.log(singleList);
    console.log(singleList.title);
    res.render('renters/singlerent.ejs', { singleList });
}
module.exports.renderAddRentForm = async (req, res) => {
    console.log("Hi from the form page")
    res.render('renters/addrent.ejs');

}
module.exports.addRent = async (req, res) => {
    console.log(req.body.rent);
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url + ".." + filename);
    let list = new Listing(req.body.rent);
    const own = req.user._id;
    list.owner = own;
    list.image = { url, filename };
    list.rentStatus = 'unBooked';
    await list.save();
    console.log(list);
    req.flash("success", "New Renting Created !");
    res.redirect(`/renter/${own}/rentShow`);
}

module.exports.orders = async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let orderDet = await Order.find({ owner: id }).populate('carId').populate('owner').populate('customer');
    console.log(orderDet[0]);
    res.render('renters/orders.ejs', { orderDet })
}

module.exports.updateOrder = async (req, res) => {
    let { id } = req.params;
    console.log("Hi from the update page" + id);
    let orderDet = await Order.findById(id).populate('carId').populate('owner').populate('customer');
    console.log(orderDet);
    orderDet.status = 'Processed';
    orderDet.save();
    let carID = orderDet.carId.id;
    console.log(carID)
    let list = await Listing.findById(carID);
    console.log("The list is " + list);
    list.rentStatus = 'unBooked';
    list.save();
    let redirectId = orderDet.owner.id;
    res.redirect(`/renter/${redirectId}/orders`)
}


module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    console.log("The listing is " + JSON.stringify(req.body.listing));

    let newList = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        // console.log("The files is "+req.file);
        let url = req.file.path;
        let filename = req.file.filename;
        newList.image = { url, filename };
        await newList.save();
    }
    // console.log(newList);
    req.flash("success", "Listing Updated !");
    res.redirect(`/renter`);
}

module.exports.editListForm = async (req, res) => {
    let { id } = req.params;
    const editList = await Listing.findById(id);
    if (!editList) {
        req.flash("error", "Listing you requested for does not exist !");
        res.redirect('/listings');
    }
    // console.log(editList);
    // This is for showing the preview in the reduced quality form
    let originalImageUrl = editList.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250")
    res.render("renters/rentersedit.ejs", { editList, originalImageUrl })
}

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    const deleteList = await Listing.findByIdAndDelete(id);
    console.log(deleteList);
    req.flash("success", "Listing Deleted !");
    res.redirect("/renter")
}

