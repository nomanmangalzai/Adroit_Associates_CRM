
    const nodemailer = require('nodemailer');
    // const { email } = require('../controller/emailConfig');
    const{email} = require("../controller/emailConfig")

    const transporter = nodemailer.createTransport(email);

    const sendEmail = async (recipient, subject, message) => {
    try {
        const mailOptions = {
        from: email.auth.user,
        to: recipient,
        subject,
        text: message,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.log('Error occurred while sending email:', error);
    }
    };

    module.exports = { sendEmail };
   