// emailRoutes.js

const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/verifyToken"); // Update the import statement

const { sendEmailController } = require("../controller/emailController");
const { getEmailsController } = require("../controller/emailController");
const { getEmailHistory } = require("../controller/emailController");
const { saveEmail } = require("../controller/emailController");
const { allEmails } = require("../controller/emailController");
const { rejectEmail } = require("../controller/emailController");
const { allRequestedEmails } = require("../controller/emailController");

router.post(
  "/send-email/:emailId/:firstName/:lastName",
  verifyToken,
  sendEmailController
);
router.get("/fetch-emails", verifyToken, getEmailsController);
router.get("/email-history", verifyToken, getEmailHistory);
router.post("/save-email-for-verification", verifyToken, saveEmail);
router.get("/all-emails", verifyToken, allEmails);
router.get("/all-requested-emails", verifyToken, allRequestedEmails);
router.delete("/reject-email/:emailId", rejectEmail);

module.exports = router;
