const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: String,
  brandName: String,
  category: String,
  productImage: [],
  description: String,
  price: Number,
  selling: Number,
},
{
    timestamps: true
});
const ProductModel = mongoose.model("product",productSchema);
module.exports = ProductModel;