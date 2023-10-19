// emailRoutes.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/verifyToken"); // Update the import statement

const { sendEmailController } = require("../controller/emailController");
const { getEmailsController } = require("../controller/emailController");
const { getEmailHistory } = require("../controller/emailController");
const { updateEmailController } = require("../controller/emailController");
const { allEmails } = require("../controller/emailController");

router.post("/send-email", verifyToken, sendEmailController);
router.get("/fetch-emails", verifyToken, getEmailsController);
router.get("/email-history", verifyToken, getEmailHistory);
router.get("/update-scheduled-email", verifyToken, updateEmailController);
router.get("/all-emails", verifyToken, allEmails);

module.exports = router;
