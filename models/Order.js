// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  sessionId: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  total: Number,
  paymentRef: String,
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);