const mongoose = require("mongoose");

module.exports = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  stock: Number,
  createdAt: { type: Date, default: Date.now }
}));
