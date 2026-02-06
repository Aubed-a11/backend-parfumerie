// routes/cart.js
const express = require("express");
const Cart = require("../models/Cart");
const router = express.Router();

/* 🔑 récupérer ou créer panier */
async function getCart(sessionId) {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) cart = await Cart.create({ sessionId, items: [] });
  return cart;
}

/* ➕ Ajouter */
router.post("/add", async (req, res) => {
  const { sessionId, product } = req.body;
  const cart = await getCart(sessionId);

  const item = cart.items.find(i => i.productId == product._id);
  if (item) item.quantity++;
  else {
    cart.items.push({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  await cart.save();
  res.json(cart);
});

/* 📥 Voir panier */
router.get("/:sessionId", async (req, res) => {
  const cart = await getCart(req.params.sessionId);
  res.json(cart);
});

/* 🔄 Modifier quantité */
router.put("/update", async (req, res) => {
  const { sessionId, productId, quantity } = req.body;
  const cart = await getCart(sessionId);

  const item = cart.items.find(i => i.productId == productId);
  if (item) item.quantity = quantity;

  await cart.save();
  res.json(cart);
});

/* ❌ Supprimer */
router.delete("/remove/:sessionId/:productId", async (req, res) => {
  const cart = await getCart(req.params.sessionId);
  cart.items = cart.items.filter(i => i.productId != req.params.productId);
  await cart.save();
  res.json(cart);
});

module.exports = router;
