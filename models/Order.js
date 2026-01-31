const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  amount: Number,
  method: String,
  status: { type: String, default: "PENDING" },
  invoice_id: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
