const mongoose = require("mongoose");

const accountRequest = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String , unique: true},
  password: { type: String },
  isAdmin: {
    type: String,
    default: 'false'
  },

});



module.exports = mongoose.model("accountRequest", accountRequest);