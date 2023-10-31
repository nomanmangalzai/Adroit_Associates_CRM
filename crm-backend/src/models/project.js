const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: { type: String },
  client: { type: String },
  clientPOC: { type: String },
  pocEmailAddress: { type: String },
  projectStartingDate: { type: Date },
  projectEndDate: { type: Date },
  assignedTo: { type: String },
  oneYear: { type: Boolean, default: false },
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
