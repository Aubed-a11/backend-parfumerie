const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const auth = require("../middleware/auth");
/* ================= GET : tous les produits ================= */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

/* ================= POST : ajouter un produit ================= */
router.post("/", async (req, res) => {
  try {
    const { name, description, category, price, stock, image } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Nom et prix obligatoires" });
    }

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      stock,
      image
    });

    await newProduct.save();

    res.status(201).json({
      message: "Produit ajouté avec succès",
      product: newProduct
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de l'ajout du produit" });
  }
});

router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Produit supprimé" });
});
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });
module.exports = router;
