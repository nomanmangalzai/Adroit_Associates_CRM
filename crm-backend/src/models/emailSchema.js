const mongoose = require("mongoose");

const scheduledEmailSchema = new mongoose.Schema({
  recipient: {
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

const emailSchema = mongoose.model("scheduledEmails", scheduledEmailSchema);

module.exports = emailSchema;
