const { sendEmail } = require("../utilities/emailUtils");
const { sendEmailsToMultipleRecipients } = require("../utilities/emailUtils");
const scheduledEmailSchema = require("../models/emailSchema");
const requestedEmailCollection = require("../models/requestedEmail");
const crmCalendar = require("../models/crmCalendar");
const express = require("express");
const app = express();

app.use(express.json());

const sendEmailController = async (req, res, next) => {
  console.log("The sendEmailController API hit");

  const emailId = req.params.emailId;
  const firstName = req.params.firstName;
  const lastName = req.params.lastName;
  console.log(emailId);
  const emailData = await requestedEmailCollection.findOne({ _id: emailId });
  const recipient = emailData.recipient;
  const subject = emailData.subject;
  const message = emailData.message;
  const scheduledSendTime = emailData.scheduledSendTime;
  const senderEmail = "noman.mangalzai4@gmail.com";
  //
  console.log("email id =" + emailId);
  // console.log("recipient=" + emailData.recipient);
  // const senderEmail = email;
  console.log("senderEmail = " + senderEmail);
  console.log("scheduledSendTime= " + scheduledSendTime + "");

  // Convert scheduledSendTime to Afghanistan time
  const scheduledTime = new Date(scheduledSendTime);
  const timeZone = "Asia/Kabul";
  const options = { timeZone: timeZone };
  const convertedScheduledTime = scheduledTime.toLocaleString("en-US", options);

  // Output the converted time
  console.log(
    "Scheduled Send Time (Afghanistan Time):",
    convertedScheduledTime
  );
  console.log("scheduledSendTime =", convertedScheduledTime);

  if (scheduledSendTime === null) {
    try {
      console.log("!scheduledSendTime condition run");
      // Handle case when scheduledSendTime is not provided
      // below line sends the email
      await sendEmailsToMultipleRecipients(recipient, subject, message);
      console.log("Email sent immediately at:", new Date());
      const response = await requestedEmailCollection.deleteOne({
        _id: emailId,
      });
      res.status(200).json({
        message: "Your email has been sent immediately. Thank you.",
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to send immediate email" });
    }
  }

  try {
    if (scheduledSendTime) {
      const scheduledTime = new Date(convertedScheduledTime);
      const currentTime = new Date();

      if (scheduledTime > currentTime) {
        const delay = scheduledTime.getTime() - currentTime.getTime();

        // Save scheduled email to the database
        const newScheduledEmail = new scheduledEmailSchema({
          recipient,
          subject,
          message,
          scheduledSendTime: scheduledTime,
        });
        await newScheduledEmail.save();

        const reminderDelay = delay - 15 * 60 * 1000; // 15 minutes before the scheduled time
        const secondReminderDelay = delay - 24 * 60 * 60 * 1000; // 1 day before the scheduled time

        //timeout for first reminder email
        setTimeout(async () => {
          try {
            // Send reminder email
            const senderName = `${firstName} ${lastName}`; // Replace with the actual sender's name
            const reminderSubject = "Reminder: " + subject;
            const reminderMessage = `Subject: Friendly Reminder: Email Scheduled in 15 Minutes

            Dear ${senderName},

            I hope this email finds you well. I'm reaching out to remind you about an important email that you have scheduled to be sent to ${recipient} in just 15 minutes.

            As the designated time approaches, I wanted to ensure that you are prepared and ready to deliver your message effectively. Here are a few key details to keep in mind:

            Recipient: ${recipient}
            Scheduled Time:  ${scheduledSendTime}
            Subject: ${subject}

            Please take a moment to review the content of the email to ensure its accuracy and clarity. Double-check any attachments or links that need to be included, as well as the overall tone and message you wish to convey.

            If you have any last-minute changes or updates to make, now is the perfect time to do so. Your attention to detail will greatly contribute to the success of your communication.

            Should you require any assistance or have any questions, please feel free to reach out to me. I'm here to support you in any way I can.

            Thank you for your time and dedication to effective communication. Good luck with your email, and I trust it will have a positive impact on ${recipient}.

            Best regards,`;
            await sendEmailsToMultipleRecipients(
              senderEmail,
              reminderSubject,
              reminderMessage
            );
            console.log("Reminder email sent at:", new Date());
          } catch (error) {
            console.log("Error occurred while sending reminder email:", error);
          }
        }, reminderDelay);

        //second reminder email code is below
        setTimeout(async () => {
          try {
            // Send second reminder email
            const senderName = `${firstName} ${lastName}`; // Replace with the actual sender's name
            const secondReminderSubject = "Second Reminder: " + subject;
            const secondReminderMessage = `Subject: Friendly Reminder: Email Scheduled in 1 Day

            Dear ${senderName},

            This is a friendly reminder about an important email that you have scheduled to be sent to ${recipient} in 1 day.

            Recipient: ${recipient}
            Scheduled Time:  ${scheduledSendTime}
            Subject: ${subject}

            Please review the content of the email and make any necessary changes or updates. Ensure that all attachments or links are included and that the overall message is clear and effective.

            Best regards,`;
            await sendEmailsToMultipleRecipients(
              senderEmail,
              secondReminderSubject,
              secondReminderMessage
            );
            console.log("Second reminder email sent at:", new Date());
          } catch (error) {
            console.log(
              "Error occurred while sending second reminder email:",
              error
            );
          }
        }, secondReminderDelay);

        /////////////////////////////////////
        //below email is sent to the actual recipient
        setTimeout(async () => {
          try {
            // Send scheduled email
            await sendEmailsToMultipleRecipients(recipient, subject, message);
            console.log("Email sent at:", new Date());
          } catch (error) {
            console.log("Error occurred while sending email:", error);
          }
        }, delay);

        //
        const response = await requestedEmailCollection.deleteOne({
          _id: emailId,
        });
        if (response) {
          console.log("Deleted");
        } else {
          console.log("did not deleted");
        }

        //
        console.log("check");
        res.status(200).json({
          message: `Your email has been scheduled to be sent at ${convertedScheduledTime}. Thank you.`,
        });
      } else {
        // below line sends the email
        await sendEmailsToMultipleRecipients(recipient, subject, message);
        console.log("Email sent immediately at:", new Date());
        const response = await requestedEmailCollection.deleteOne({
          _id: emailId,
        });
        if (response) {
          console.log("Deleted");
        } else {
          console.log("did not deleted");
        }

        res.status(200).json({
          message: "Your email has been sent immediately. Thank you.",
        });
      }
    } else {
      await sendEmailsToMultipleRecipients(recipient, subject, message);
      console.log("Email sent immediately at:", new Date());
      res
        .status(200)
        .json({ message: "Your email has been sent immediately. Thank you." });
    }
  } catch (error) {
    console.log("Error occurred while sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

//fetch emails
const moment = require("moment-timezone");

// Controller method to fetch emails
const getEmailHistory = async (req, res) => {
  try {
    const emails = await scheduledEmailSchema.find({});
    res.status(200).json(emails);
  } catch (error) {
    console.log("Error occurred while fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};

//
const getEmailsController = async (req, res) => {
  try {
    console.log("getEmailsController API called");

    // Get the current time in UTC
    const currentTimeUTC = new Date();
    console.log(currentTimeUTC);

    // Fetch the scheduled emails
    const emails = await scheduledEmailSchema.find({});

    // Filter out the emails whose scheduledSendTime has passed
    const remainingEmails = emails.filter(
      (email) => email.scheduledSendTime > currentTimeUTC
    );
    console.log("Filtered remaining emails");

    // Send the remaining scheduled emails in the response
    res.status(200).json(remainingEmails);
  } catch (error) {
    console.log("Error occurred while fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};

///below is important API = Save Email

const saveEmail = async (req, res) => {
  console.log("The save email API hit");
  //
  const {
    recipient,
    subject,
    message,
    scheduledSendTime,
    firstName,
    lastName,
    email,
  } = req.body;
  console.log("message=" + message);
  const senderEmail = email;
  console.log("senderEmail = " + senderEmail);
  console.log("scheduledSendTimeww= " + scheduledSendTime + "");

  // Convert scheduledSendTime to Afghanistan time
  const scheduledTime = new Date(scheduledSendTime);
  const timeZone = "Asia/Kabul";
  const options = { timeZone: timeZone };
  const convertedScheduledTime = scheduledTime.toLocaleString("en-US", options);

  // Output the converted time
  console.log(
    "Scheduled Send Time (Afghanistan Time):",
    convertedScheduledTime
  );
  console.log("scheduledSendTime =", convertedScheduledTime);

  if (!scheduledSendTime) {
    // Handle case when scheduledSendTime is not provided
  }

  try {
    if (scheduledSendTime) {
      const scheduledTime = new Date(convertedScheduledTime);
      const currentTime = new Date();

      if (scheduledTime > currentTime) {
        const delay = scheduledTime.getTime() - currentTime.getTime();

        // Save scheduled email to the database
        const newScheduledEmail = new requestedEmailCollection({
          recipient,
          senderEmail,
          subject,
          message,
          scheduledSendTime: scheduledTime,
        });
        await newScheduledEmail.save();
        if (newScheduledEmail) {
          return res.status(200).json({
            message:
              "The email has successfully been recieved and sent to admin for verification",
          });
        } else {
          return res.status(200).json({
            message:
              "The email has successfully been recieved and sent to admin for verification",
          });
        }
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Could not save your email settings",
    });
  }
};

//
const allEmails = async (req, res, next) => {
  console.log("the allEmails API hit");
  try {
    const calendarEmails = await crmCalendar.find({}, "emailAddress");
    console.log(calendarEmails);
    res.status(200).json(calendarEmails);
  } catch (error) {
    console.log("Error occurred while fetching all emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};

//
const allRequestedEmails = async (req, res, next) => {
  console.log("the allEmails API hit");
  try {
    const allRequestedEmails = await requestedEmailCollection.find(
      {},
      { __v: 0 }
    );
    console.log(allRequestedEmails);
    res.status(200).json(allRequestedEmails);
  } catch (error) {
    console.log("Error occurred while fetching all emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};

//Reject Email API
const rejectEmail = async (req, res, next) => {
  console.log("Verify Email API called");
  const emailId = req.params.emailId;
  try {
    // const response = await requestedEmailCollection.deleteOne({ _id: emailId });
    const response = await requestedEmailCollection.findOneAndDelete({
      _id: emailId,
    });
    console.log(emailId);
    if (response) {
      return res
        .status(200)
        .json({ message: "The email has been successfully rejected" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Could not reject the email" });
  }
};

module.exports = {
  sendEmailController,
  getEmailsController,
  getEmailHistory,
  saveEmail,
  allEmails,
  rejectEmail,
  allRequestedEmails,
};
