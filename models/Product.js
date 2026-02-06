const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      enum: ["Homme", "Femme"],
      required: true
    },

    scent: {
      type: String,
      enum: ["Floral", "Oriental", "Boisé"],
      required: true
    },

    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

// ✅ protection contre recompilation (Next.js / Nodemon safe)
module.exports =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
