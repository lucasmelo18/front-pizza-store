let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    departaments: []
}, {versionKey: false});

module.exports = mongoose.model("Product", productSchema);