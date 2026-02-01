const express = require("express");
const router = express.Router();

// const Order = require("../models/Order"); // si utilisé

router.put("/:id/status", async (req, res) => {
  try {
    // logique ici
    res.json({ message: "Statut mis à jour" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
