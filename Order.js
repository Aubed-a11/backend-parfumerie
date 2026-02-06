const mongoose = require("mongoose");

module.exports = mongoose.model("Order", new mongoose.Schema({
  customer: String,
  products: Array,
  total: Number,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered", "Cancelled"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now }
}));
