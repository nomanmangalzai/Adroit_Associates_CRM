// import React, { useEffect, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { Container, Table, Button } from "react-bootstrap";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
// });

// const fetchEmails = async () => {
//   const token = localStorage.getItem("token");

//   try {
//     const response = await fetch(
//       "http://localhost:5000/email/all-requested-emails",
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log("Error occurred while fetching emails:", error);
//     throw new Error("Failed to fetch emails");
//   }
// };

// const formatTime = (time) => {
//   const options = {
//     timeZone: "Asia/Kabul",
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//   };

//   return new Date(time).toLocaleString("en-US", options);
// };

// //

// const EmailList = () => {
//   const [emails, setEmails] = useState([]);

//   const userData = JSON.parse(localStorage.getItem("userData"));
//   console.log(userData);
//   const { firstName } = userData;
//   const { lastName } = userData;

//   // const firstName = userData.firstName;
//   console.log("=" + firstName);

//   useEffect(() => {
//     const getEmails = async () => {
//       try {
//         //

//         const data = await fetchEmails();
//         setEmails(data);
//       } catch (error) {
//         // Handle error
//       }
//     };

//     getEmails();
//   }, []);

//   const handleVerifyEmail = async (emailId, firstName, lastName) => {
//     try {
//       const token = localStorage.getItem("token");
//       const bodyData = {
//         firstName: firstName,
//         lastName: lastName,
//       };
//       const response = await fetch(
//         `http://localhost:5000/email/send-email/${emailId}/${firstName}/${lastName}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(bodyData),
//         }
//       );
//       if (response.ok) {
//         // Email verification successful, handle the update locally
//         setEmails(emails.filter((email) => email._id !== emailId));
//       } else {
//         // Email verification failed, handle the error
//         throw new Error("Failed to verify email");
//       }
//     } catch (error) {
//       console.log("Error occurred while verifying email:", error);
//       // Handle error
//     }
//   };

//   //

//   const handleRejectEmail = async (emailId) => {
//     // Handle reject email logic here
//     console.log(`Rejecting email with ID: ${emailId}`);
//     const token = localStorage.getItem("token");
//     try {
//       const response = await fetch(
//         `http://localhost:5000/email/send-email/${emailId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (response.ok) {
//         // Email verification successful, handle the update locally
//         setEmails(emails.filter((email) => email._id !== emailId));
//       } else {
//         // Email verification failed, handle the error
//         throw new Error("Failed to verify email");
//       }
//     } catch (error) {}

//     // Send the emailId to the backend for rejection
//   };

//   return (
//     <Container>
//       <h2 className="text-center mb-4">Email List for Verification</h2>

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Table, Button, Alert, Fade } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const fetchEmails = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://localhost:5000/email/all-requested-emails",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error occurred while fetching emails:", error);
    throw new Error("Failed to fetch emails");
  }
};

const formatTime = (time) => {
  const options = {
    timeZone: "Asia/Kabul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Date(time).toLocaleString("en-US", options);
};

const EmailList = () => {
  const [emails, setEmails] = useState([]);
  const [responseMessage, setResponseMessage] = useState(""); // State variable for response message
  const [showAlert, setShowAlert] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  const { firstName } = userData;
  const { lastName } = userData;

  useEffect(() => {
    const getEmails = async () => {
      try {
        const data = await fetchEmails();
        setEmails(data);
      } catch (error) {
        // Handle error
      }
    };

    getEmails();
  }, []);

  const handleVerifyEmail = async (emailId, firstName, lastName) => {
    try {
      const token = localStorage.getItem("token");
      const bodyData = {
        firstName: firstName,
        lastName: lastName,
      };
      const response = await fetch(
        `http://localhost:5000/email/send-email/${emailId}/${firstName}/${lastName}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(bodyData),
        }
      );
      if (response.ok) {
        // Email verification successful, handle the update locally
        setEmails(emails.filter((email) => email._id !== emailId));
        setResponseMessage("Email verified successfully."); // Update response message
      } else {
        // Email verification failed, handle the error
        throw new Error("Failed to verify email");
      }
    } catch (error) {
      console.log("Error occurred while verifying email:", error);
      // Handle error
    }
  };

  const handleRejectEmail = async (emailId) => {
    console.log(`Rejecting email with ID: ${emailId}`);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:5000/email/reject-email/${emailId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setEmails(emails.filter((email) => email._id !== emailId));
        setResponseMessage("Email rejected successfully."); // Update response message
      } else {
        throw new Error("Failed to verify email");
      }
    } catch (error) {}

    // Send the emailId to the backend for rejection
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Email List for Verification</h2>
      {/* {responseMessage && (
        <div className="text-center mb-4">{responseMessage}</div>
      )} */}
      {responseMessage && (
        <Fade in={showAlert}>
          <Alert
            variant="success"
            className="text-center mb-4"
            dismissible
            onClose={() => setShowAlert(false)}
          >
            {responseMessage}
          </Alert>
        </Fade>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Recipient</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Scheduled Send Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email, index) => (
            <tr key={email._id}>
              <td>{index + 1}</td>
              <td>{email.recipient}</td>
              <td>{email.subject}</td>
              <td>{email.message}</td>
              <td>{formatTime(email.scheduledSendTime)}</td>
              <td>
                <Button
                  variant="success"
                  onClick={() =>
                    handleVerifyEmail(email._id, firstName, lastName)
                  }
                >
                  Verify Email
                </Button>

                <Button
                  variant="danger"
                  onClick={() => handleRejectEmail(email._id)}
                >
                  Reject Email
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmailList;
