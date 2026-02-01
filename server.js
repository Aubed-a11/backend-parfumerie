require("dotenv").config();
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
const authAdmin = require("./middleware/authAdmin");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/parfumerie");

app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", authAdmin, require("./routes/admin"));

io.on("connection", socket => {
  console.log("Admin connecté");
});

app.set("io", io);

server.listen(5000, () =>
  console.log("Backend lancé sur http://localhost:5000")
);
