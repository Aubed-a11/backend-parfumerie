const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "superadmin"],
    default: "admin"
  }
});


module.exports = mongoose.model("Admin", AdminSchema);
