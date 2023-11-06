const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

app.get(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//importing database file
const { connectToMongoDB } = require("./src/db/connection");

//Below are files of routes folder.
const autRoute = require("./src/routes/auth");
const emailRoute = require("./src/routes/emailRoutes");
const crmCalendarRoute = require("./src/routes/crmCalendar");
const project = require("./src/routes/project");
const newsletter = require("./src/routes/newsletter");

//Below are middllewares.
app.use("/authUser", autRoute);
app.use("/email", emailRoute);
app.use("/crm-calendar", crmCalendarRoute);
app.use("/project", project);
app.use("/newsletter", newsletter);

//below is database connection and server starting.
const uri =
  "mongodb+srv://nomanmangalzai4:Katapoorkooz1@cluster0.nvltbzm.mongodb.net/?retryWrites=true&w=majority";
const PORT = 5000;

const { viewProjects } = require("./src/controller/project");

connectToMongoDB()
  .then(() => {
    // app.use("/", routes);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${[PORT]}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server:", err);
  });

// mongoose
//   .connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Database connected");
//     // Start the server after successful database connection
//     app.listen(PORT, console.log(`Server started on port ${PORT}`));
//   })
//   .catch((err) => console.log("Database connection error:", err));

// // app.listen(PORT, console.log(`Server Started on port ${PORT}`));
