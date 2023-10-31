const nodemailer = require("nodemailer");
// const { email } = require('../controller/emailConfig');
const { email } = require("../controller/emailConfig");

const transporter = nodemailer.createTransport(email);

const sendEmail = async (recipient, subject, message) => {
  try {
    const mailOptions = {
      from: email.auth.user,
      to: recipient,
      subject,
      text: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.log("Error occurred while sending email:", error);  
  }
};



const sendEmailsToMultipleRecipients = async (recipients, subject, message) => {
  try {
    // Convert recipients to an array if it's not already
    if (!Array.isArray(recipients)) {
      recipients = [recipients];
    }

    // Iterate over each recipient
    for (const recipient of recipients) {
      // Call the sendEmail function with the current recipient
      console.log("email = " + recipient);
      await sendEmail(recipient, subject, message);
    }
    console.log("Emails sent to multiple recipients successfully");
  } catch (error) {
    console.log(
      "Error occurred while sending emails to multiple recipients:",
      error
    );
  }
};
module.exports = { sendEmailsToMultipleRecipients };
