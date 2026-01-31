const express = require("express");
const axios = require("axios");
const Order = require("../models/Order");
const router = express.Router();

router.post("/create-payment", async (req, res) => {
  const { amount, method } = req.body;

  try {
    // 1️⃣ Créer commande
    const order = await Order.create({ amount, method });

    // 2️⃣ PayDunya invoice
    const response = await axios.post(
      "https://app.paydunya.com/api/v1/checkout-invoice/create",
      {
        invoice: {
          total_amount: amount,
          description: "Commande SS Parfumeries"
        },
        store: {
          name: "SS Parfumeries"
        },
        custom_data: {
          order_id: order._id.toString()
        },
        actions: {
          callback_url: `${process.env.BASE_URL}/api/payment/webhook`,
          return_url: `${process.env.BASE_URL}/success.html`,
          cancel_url: `${process.env.BASE_URL}/cancel.html`
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          "PAYDUNYA-MASTER-KEY": process.env.PAYDUNYA_MASTER_KEY,
          "PAYDUNYA-PRIVATE-KEY": process.env.PAYDUNYA_PRIVATE_KEY,
          "PAYDUNYA-PUBLIC-KEY": process.env.PAYDUNYA_PUBLIC_KEY,
          "PAYDUNYA-TOKEN": process.env.PAYDUNYA_TOKEN
        }
      }
    );

    // 3️⃣ Sauvegarder invoice
    order.invoice_id = response.data.response_text;
    await order.save();

    res.json({
      payment_url: response.data.response_text
    });

  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Erreur PayDunya" });
  }
});

module.exports = router;
