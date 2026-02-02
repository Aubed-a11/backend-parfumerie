require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const paymentRoutes = require("./routes/payment");
const ordersRoutes = require("./routes/orders");
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error("Erreur MongoDB :", err));


app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", paymentRoutes);
app.use("/uploads", express.static("uploads"));


io.on("connection", socket => {
  console.log("Admin connecté");
});

app.set("io", io);
app.get("/", (req, res) => {
  res.send("🚀 API Parfumerie en ligne");
});

server.listen(PORT, () => {
  console.log("Backend lancé sur le port", PORT);
});