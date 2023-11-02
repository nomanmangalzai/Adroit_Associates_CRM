const Project = require("../models/project");
const express = require("express");
const app = express();
app.use(express.json());
const { sendEmail } = require("../utilities/emailUtils");
const { sendEmailsToMultipleRecipients } = require("../utilities/emailUtils");
//checking to send one year later email library
const schedule = require("node-schedule");
////////////////////////////////////////////////////////////////////////////////
const requestedEmailCollection = require("../models/requestedEmail");
const senderEmail = "noman.mangalzai4@gmail.com";

const postProject = async (req, res, next) => {
  console.log("postProject API called.");
  const value = req;
  if (value) {
    console.log("The paramter passed is:=" + value);
    console.log("IF condition called.");

    const allProjects = await Project.find({});
    console.log("allProjects=" + allProjects);
    const allProjectsDates = allProjects.map(
      (project) => project.projectStartingDate
    );
    //some checks and others
    const currentDate = new Date(); // Get the current date
    console.log("currentDate =" + currentDate);

    for (let i = 0; i < allProjectsDates.length; i++) {
      const date = new Date(allProjectsDates[i]);
      const oneYearAgo = new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      console.log(oneYearAgo);
      const isLeapYear =
        (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) ||
        date.getFullYear() % 400 === 0;
      const oneYearDuration = isLeapYear ? 366 : 365;

      //below we check if difference is one year or not
      if (date === oneYearDuration || date > oneYearDuration) {
        console.log(
          `Index ${i}: ${date} is equal to or greater than one year.`
        );
        //compose and send one year wala email
        const recipient = allProjects[i].pocEmailAddress;
        const projectName = allProjects[i].projectName;
        const clientPOC = allProjects[i].clientPOC;
        const subject = "Thank You Email";
        // const message = 'Dear ${cientPOC},\n\n we had a project named ${projectName} which has been completed
        // exactly a year ago by our team. Therefore, we would like to thank you for that.'
        const message = `Dear ${clientPOC},\n\n
        we had a project named "${projectName}" which has been completed exactly a year ago by our team. Therefore, we would like to thank you for that.`;

        //send the email
        var oneYear = allProjects[i].oneYear;
        if (oneYear === false) {
          // await sendEmailsToMultipleRecipients(recipient, subject, message);
          // const _id = allProjects[i]._id;
          // const project = await Project.findOneAndUpdate(
          //   { _id: _id },
          //   { $set: { oneYear: true } },
          //   { new: true }
          // );
          // Save scheduled email to the database
          const newScheduledEmail = new requestedEmailCollection({
            recipient,
            senderEmail,
            subject,
            message,
            scheduledSendTime: allProjectsDates[i],
          });
          await newScheduledEmail.save();

          // if (project) {
          //EMAIL WERE ALREADY SENT
          //only send a response
        }
        // }
      } else {
        console.log(`Index ${i}: ${date} is less than one year.`);
        res.status(200).json({
          message: "There was no one year email to be sent to clients",
        });
      }
    }
  } else {
    //
    const {
      projectName,
      client,
      clientPOC,
      pocEmailAddress,
      projectStartingDate,
      projectEndDate,
      assignedTo,
    } = req.body;

    // if (projectName) {
    console.log("if projectName condition entered");
    try {
      console.log(projectName);

      const newProject = new Project({
        projectName: projectName,
        client: client,
        clientPOC: clientPOC,
        pocEmailAddress: pocEmailAddress,
        projectStartingDate: projectStartingDate,
        projectEndDate: projectEndDate,
        assignedTo: assignedTo,
      });

      //

      //
      const saveProject = await newProject.save();
      if (saveProject) {
        return res
          .status(201)
          .json({ message: "Project has been saved successfully" });
      } else {
        return res
          .status(500)
          .json({ message: "Project was not saved successfully" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while saving the project" });
    }
  }
};

//call postProject everymorning
const job = schedule.scheduleJob("0 8-11,13-16 * * *", () => {
  postProject("Automated Email");
});

//fetch projects
const viewProjects = async (req, res, next) => {
  console.log("fetchProjects API has been called.");
  const value = req;
  if (value === "popup") {
    //for data you use allProjects
    const allProjects = await Project.find({});
    ///////////////////////////////////////////////////
    const allProjectsDates = allProjects.map(
      (project) => project.projectStartingDate
    );

    //below variable we send to the frontend
    const responses = [];
    projectData = [];
    ////////////////////////////////////////
    for (let i = 0; i < allProjects.length; i++) {
      //how many days a year is
      const date = new Date(allProjectsDates[i]);
      const currentDate = new Date(); // Current date

      // Calculate the time difference in milliseconds
      const timeDifference = currentDate.getTime() - date.getTime();

      // Convert the time difference to days
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

      console.log(daysDifference); // Number of days between the given date and the current date

      const isLeapYear =
        (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) ||
        date.getFullYear() % 400 === 0;
      const oneYearDuration = isLeapYear ? 366 : 365;
      console.log("date = " + date);
      //
      //////determine if one year or more
      if (
        daysDifference === oneYearDuration ||
        daysDifference > oneYearDuration
      ) {
        //
        if (oneYearDuration === 366) {
          //leap year

          if (oneYearDuration - 15 === 351) {
            console.log("15 days condition called");
            responses.push("15 days");
            projectData.push(allProjects[i].projectName);
          } else if (oneYearDuration - 5 === 361) {
            responses.push("5 days");
            projectData.push(allProjects[i].projectName);
          } else {
            responses.push("1 day");
            projectData.push(allProjects[i].projectName);
          }
        } else if (oneYearDuration === 365) {
          if (oneYearDuration - 15 === 350) {
            responses.push("15 days");
            projectData.push(allProjects[i].projectName);
          } else if (oneYearDuration - 5 === 360) {
            responses.push("5 days");
            projectData.push(allProjects[i].projectName);
          } else {
            responses.push("1 day");
            projectData.push(allProjects[i].projectName);
          }
        } else {
          console.log("No one year left to email");
        }

        //
        // const project = allProjects[i];
        // Perform operations on each project record
      }
    }

    //in the loop above the responses have been gathered
    //NOW SEND RESPONSE TO FRONTEND
    // return res
    //   .status(200)
    //   .json({ responses: responses, projectData: projectData });

    ////////////////////////////////////////////////////
  } else {
    try {
      const allProjects = await Project.find({});
      res.status(200).json(allProjects);
    } catch (error) {
      return res.status(500).json("Could not retrieve the projects");
    }
  }
};

//call viewProjects for popup
const popupJob = schedule.scheduleJob("0 8-11,13-16 * * *", () => {
  viewProjects("popup");
});
module.exports = { postProject, viewProjects };

///
// Assuming 'date' and 'oneYearAgo' are valid Date objects

// const oneYearAgo = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());

// if (date >= oneYearAgo) {
//   const isLeapYear = (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0) || date.getFullYear() % 400 === 0;
//   const oneYearDuration = isLeapYear ? 366 : 365;

//   if (date.getTime() - oneYearAgo.getTime() >= oneYearDuration * 24 * 60 * 60 * 1000) {
//     console.log(`Index ${i}: ${date} is equal to or greater than one year.`);
//     console.log(allProjects[i]);
//   } else {
//     console.log(`Index ${i}: ${date} is less than one year.`);
//   }
// } else {
//   console.log(`Index ${i}: ${date} is less than one year.`);
// }
