// controllers/authController.js
const users = require("../models/auth");

//database collection for account request
const accountRequestCollection = require("../models/accountRequest");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const secret = require("./config").secret; //contains secret key used to sign tokens
const emailValidator = require("node-email-validation");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//signup API
const signUp = async (req, res, next) => {
  console.log("The signup api has been hit");
  var { firstName, lastName, email, password, confirmPassword, userId } =
    req.body;
  // console.log(userId)
  // const passwordLength = password.length;

  if (userId) {
    var fetchAccountRequestData = await accountRequestCollection.findOne({
      _id: userId,
    });
    console.log(fetchAccountRequestData);
    firstName = fetchAccountRequestData.firstName;
    lastName = fetchAccountRequestData.lastName;
    email = fetchAccountRequestData.email;
    password = fetchAccountRequestData.password;
    console.log(password + email);

    //check
    const userExists = await users.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "User with this email is already registered." });
    }
    //save the user
    const newUser = new users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    });

    //delete the user from userAccountRequest
    const result = await accountRequestCollection.deleteOne({ email: email });

    try {
      await newUser.save();
      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  //below is the logic for people

  const isEmailValid = emailValidator.is_email_valid(email);
  if (!isEmailValid) {
    return res
      .status(403)
      .json({ message: "Please provide a valid email address" });
  }

  const userExists = await users.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email is already registered." });
  }

  //check password and confirmPassword
  if (password != confirmPassword) {
    return res.status(400).json({
      message: "Password and confirm password don't match",
    });
  }

  if (passwordLength < 6) {
    return res.status(400).json({
      message: "Password is too small ",
    });
  }

  const newUser = new users({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  //save the user
  try {
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    res.status(500).send(error);
  }
};

//below is signIn API
const signIn = async (req, res, next) => {
  console.log("signin api has been hit");

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await users.findOne({ email });

    if (!user) {
      console.log("if (!user) { called");
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(400).json({ message: "Invalid Credentials" });
    // }
    if (password != user.password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    let userInfo = await users.findOne({ email: email }).select("-password");
    jwt.sign(payload, secret, { expiresIn: "5 days" }, (err, token) => {
      if (err) throw err;
      console.log(token);
      res.json({
        token,
        User: userInfo,
        message: "Congratulations! You have been successfully logged in",
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//..

//user Account Request data
const userAccountRequest = async (req, res, next) => {
  console.log("The userAccountRequest api has been hit");

  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const passwordLength = password.length;
  console.log(email);

  const isEmailValid = emailValidator.is_email_valid(email);
  if (!isEmailValid) {
    return res
      .status(403)
      .json({ message: "Please provide a valid email address" });
  }

  const userExists = await accountRequestCollection.findOne({ email });
  if (userExists) {
    return res
      .status(400)
      .json({ message: "User with this email is already registered." });
  }

  //check password and confirmPassword
  if (password != confirmPassword) {
    return res.status(400).json({
      message: "Password and confirm password don't match",
    });
  }

  if (passwordLength < 6) {
    return res.status(400).json({
      message: "Password is too small ",
    });
  }

  const newAccountRequest = new accountRequestCollection({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
  });

  //save the user
  try {
    await newAccountRequest.save();
    res.status(201).json({
      message:
        "Your account request has been sent to our admin, kindly wait for confirmation",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//fetch user account requests
const fetchUserAccountRequest = async (req, res, next) => {
  try {
    const users = await accountRequestCollection.find({}, { password: 0 });
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//exporting all the APIs
module.exports = {
  signUp,
  signIn,
  userAccountRequest,
  fetchUserAccountRequest,
};
