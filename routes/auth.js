router.post("/register", async (req, res) => {
  console.log("REGISTER REÇU :", req.body); // 👈 DEBUG

  const exists = await Admin.findOne({ email: req.body.email });
  if (exists) {
    return res.status(400).send("Admin déjà existant");
  }

  const hashed = await bcrypt.hash(req.body.password, 10);

  await Admin.create({
    email: req.body.email,
    password: hashed
  });

  res.send("Compte admin créé");
});
