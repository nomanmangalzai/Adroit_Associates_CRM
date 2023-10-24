const mongoose = require("mongoose");

const requestedEmail = new mongoose.Schema({
  recipient: {
    type: String,
  },
  senderEmail: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  scheduledSendTime: {
    type: Date,
  },
});

const requestedEmailCollection = mongoose.model(
  "requested email",
  requestedEmail
);

module.exports = requestedEmailCollection;
