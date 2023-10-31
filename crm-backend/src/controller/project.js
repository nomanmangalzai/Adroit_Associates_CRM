const Project = require("../models/project");
const express = require("express");
const app = express();
app.use(express.json());
const { sendEmail } = require("../utilities/emailUtils");
const { sendEmailsToMultipleRecipients } = require("../utilities/emailUtils");
//checking to send one year later email library
const schedule = require("node-schedule");

const postProject = async (req, res, next) => {
  console.log("postProject API called.");

  const {
    projectName,
    client,
    clientPOC,
    pocEmailAddress,
    projectStartingDate,
    projectEndDate,
    assignedTo,
  } = req.body;

  if (projectName) {
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
  } else {
    console.log("else condition called.");

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
        const oneYear = allProjects[i].oneYear;
        if (oneYear === false) {
          await sendEmailsToMultipleRecipients(recipient, subject, message);
          const _id = allProjects[i]._id;
          const project = await Project.findOneAndUpdate(
            { _id: _id },
            { $set: { oneYear: true } },
            { new: true }
          );

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
  }
};

//call postProject everymorning
const job = schedule.scheduleJob("0 9 * * *", postProject);

//fetch projects
const viewProjects = async (req, res, next) => {
  console.log("fetchProjects API has been called.");
  try {
    const allProjects = await Project.find({});
    res.status(200).json(allProjects);
  } catch (error) {
    return res.status(500).json("Could not retrieve the projects");
  }
};

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
