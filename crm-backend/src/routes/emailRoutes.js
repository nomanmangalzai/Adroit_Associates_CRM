// emailRoutes.js

const express = require('express');
const { sendEmailController } = require('../controller/emailController');
const {getEmailsController} = require("../controller/emailController")
const {getEmailHistory} = require("../controller/emailController")
const {updateEmailController} = require("../controller/emailController")


const router = express.Router();

router.post('/send-email', sendEmailController);
router.get("/fetch-emails",getEmailsController);
router.get("/email-history",getEmailHistory);
router.get("/update-scheduled-email",updateEmailController);



module.exports = router;