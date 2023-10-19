const express = require("express");
const authController = require("../controller/auth");
const router = express.Router();
const { check } = require("express-validator");
const verifyToken = require("../utilities/verifyToken"); // Update the import statement

router.post("/sign-up", authController.signUp);
//below is signIn API
router.post(
  "/sign-in",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.signIn
);

//user account request api link
router.post(
  "/user-account-request",
  authController.userAccountRequest
);

router.get(
  "/fetch-user-account-requests",
  verifyToken,

  authController.fetchUserAccountRequest
);

module.exports = router;
