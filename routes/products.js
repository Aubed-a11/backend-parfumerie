const express = require("express");
const router = express.Router();
const Product = require("../models/Product"); // ✅ SEULE SOURCE
const upload = require("../middlewares/upload");

// GET tous les produits
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST ajouter un produit
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, scent } = req.body;

    if (!name || !price || !category || !scent || !req.file) {
      return res.status(400).json({
        message: "Tous les champs + image sont obligatoires"
      });
    }

    const product = new Product({
      name,
      price,
      category,
      scent,
      image: `/uploads/${req.file.filename}`
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit introuvable" });
    }

    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, category, scent } = req.body;

    if (!name || !price || !category || !scent) {
      return res.status(400).json({
        message: "Champs obligatoires manquants"
      });
    }

    const updateData = {
      name,
      price,
      category,
      scent
    };

    // ✅ image seulement si fournie
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
