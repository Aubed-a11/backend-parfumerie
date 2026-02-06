const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/create-payment", async (req, res) => {
  const { amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: "SS-" + Date.now(),
        amount,
        currency: "XOF",
        redirect_url: "http://localhost:5500/success.html",
        customer: {
          email: "client@test.com",
          name: "Client SS"
        },
        customizations: {
          title: "SS Parfumeries",
          description: "Paiement commande parfum"
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json({
      payment_url: response.data.data.link
    });

  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json({ message: "Erreur Flutterwave" });
  }
});

module.exports = router;

