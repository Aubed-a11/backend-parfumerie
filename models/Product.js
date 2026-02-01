const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    category: String,
    image: String,
  },
  { timestamps: true }
);

// ✅ protection contre recompilation
module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
