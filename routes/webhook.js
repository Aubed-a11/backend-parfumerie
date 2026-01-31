const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/payment/webhook", async (req, res) => {
  const { status, custom_data } = req.body;

  const order = await Order.findById(custom_data.order_id);

  if (!order) return res.sendStatus(404);

  order.status = status === "completed" ? "PAID" : "FAILED";
  await order.save();

  res.sendStatus(200);
});

module.exports = router;
