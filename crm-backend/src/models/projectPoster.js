const mongoose = require("mongoose");

// Define the ProjectPosterDetails Schema
const projectPosterDetailsSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  dateEmailSent: {
    type: Date,
    default: Date.now, // Default value is the current date and time
  },
});

// Create a ProjectPosterDetails model using the schema
const ProjectPosterDetails = mongoose.model(
  "ProjectPosterDetails",
  projectPosterDetailsSchema
);

module.exports = ProjectPosterDetails;
