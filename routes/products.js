const router = require("express").Router();
const Product = require("../models/Product");
const upload = require("../cloudinary");
const mongoose = require("mongoose");
// GET
router.get("/", async (_, res) => {
  res.json(await Product.find());
});

// POST avec image
router.post("/", upload.single("image"), async (req, res) => {
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    image: req.file?.path
  });

  req.app.get("io").emit("updateProducts");
  res.json(product);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  req.app.get("io").emit("updateProducts");
  res.sendStatus(200);
});

module.exports = router;
module.exports = mongoose.model("Product", new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
}));