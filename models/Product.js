const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: String,
  family: String,
  price: Number,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", ProductSchema);
