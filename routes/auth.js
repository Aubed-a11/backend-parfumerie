const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@parfum.com" && password === "1234") {
    const token = jwt.sign({ role: "admin" }, "SECRET_KEY", { expiresIn: "2h" });
    return res.json({ token });
  }

  res.status(401).json({ message: "Identifiants incorrects" });
});

module.exports = router;
