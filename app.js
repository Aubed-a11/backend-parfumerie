const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/cart", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.log(err));

app.use("/products", require("./routes/products"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server lancé sur", PORT));
