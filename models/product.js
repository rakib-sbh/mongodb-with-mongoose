const { Schema, model } = require("mongoose");
const { type } = require("os");

const productSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  price: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", productSchema);

module.exports = Product;
