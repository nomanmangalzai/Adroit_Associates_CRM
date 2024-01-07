const mongoose = require("mongoose");

const crmCalendarSchema = new mongoose.Schema({
  organization: {
    type: String,
    unique: true,
  },
  contactTitle: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  emailAddress: {
    type: String,
  },
  meetingSubject: {
    type: String,
  },
  clientPOC: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Cancelled", "Completed"],
    default: "Scheduled",
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  additionalNotes: {
    type: String,
  },
});

const crmCalendar = mongoose.model("crmCalendar", crmCalendarSchema);

module.exports = crmCalendar;
