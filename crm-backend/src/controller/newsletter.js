const Newsletter = require("../models/newsletter");
//project model
const Project = require("../models/project");
const { sendEmail } = require("../utilities/emailUtils");
const { sendEmailsToMultipleRecipients } = require("../utilities/emailUtils");

//
const sendNewsletter = async (req, res, next) => {
  console.log("sendNewsletter API Called");
  try {
    const { title, message } = req.body;

    const projects = await Project.find({});

    const newsletterRecipients = projects.map(
      (project) => project.pocEmailAddress
    );

    console.log(newsletterRecipients);

    const fullNames = projects.map((project) => project.clientPOC);
    console.log(fullNames);

    for (let i = 0; i < projects.length; i++) {
      const project = projects[i];
      const recipient = project.pocEmailAddress;
      const fullName = project.clientPOC;

      const updatedMessage = `Dear ${fullName},\n${message}`;
      console.log(updatedMessage);

      await sendEmailsToMultipleRecipients(recipient, title, updatedMessage);
    }

    return res.status(200).json({
      message: "The newsletter has been sucessfully sent to all Participants.",
    });
  } catch (error) {
    res.status(500).json({ message: "Could not send the newsletter." });
  }
};

module.exports = {
  sendNewsletter,
};
