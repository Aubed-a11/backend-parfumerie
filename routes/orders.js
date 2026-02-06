// routes/orders.js
const express = require("express");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const router = express.Router();

/* ✅ créer commande */
router.post("/create", async (req, res) => {
  const { sessionId, paymentRef } = req.body;

  const cart = await Cart.findOne({ sessionId });
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Panier vide" });

  const total = cart.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const order = await Order.create({
    sessionId,
    items: cart.items,
    total,
    paymentRef,
    status: "Paid"
  });

  cart.items = [];
  await cart.save();

  res.json(order);
});

/* 📜 historique client */
router.get("/history/:sessionId", async (req, res) => {
  const orders = await Order.find({ sessionId }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;