const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/verifyToken"); // Update thconst authController = require("../controller/auth");
const { postProject } = require("../controller/project");
const { viewProjects } = require("../controller/project");
const { popupTrigger } = require("../controller/project");

router.post("/save-project-data", verifyToken, postProject);
router.get("/view-projects", verifyToken, viewProjects);
router.get("/popup", verifyToken, popupTrigger);

//
module.exports = router;
