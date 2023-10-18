const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: { type: String },
  userRole: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
