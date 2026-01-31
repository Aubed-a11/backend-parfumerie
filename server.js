require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const paymentRoutes = require("./routes/payment");
const webhookRoutes = require("./routes/webhook");

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://ssparfumdakar.vercel.app"
  ],
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connecté"));

app.use("/api/payment", paymentRoutes);
app.use("/api/payment", webhookRoutes);

app.listen(3000, () => {
  console.log("🚀 Serveur sur http://localhost:3000");
});
