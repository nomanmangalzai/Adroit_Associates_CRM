const express = require("express");
const router = express.Router();
const verifyToken = require("../utilities/verifyToken"); // Update thconst authController = require("../controller/auth");

const { sendNewsletter } = require("../controller/newsletter");

router.post("/send-newsletter", verifyToken, sendNewsletter);

//export it
module.exports = router;
