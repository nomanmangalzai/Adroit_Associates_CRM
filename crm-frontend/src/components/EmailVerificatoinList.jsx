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
  const [editMode, setEditMode] = useState(null);
  const [editedRecipient, setEditedRecipient] = useState("");
  const [editedSubject, setEditedSubject] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editedScheduledSendTime, setEditedScheduledSendTime] = useState(""); // State variable for edited scheduledSendTime
  const [reloadComponent, setReloadComponent] = useState(false);

  const triggerComponentReload = () => {
    setReloadComponent(!reloadComponent);
  };

  //
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
  }, [reloadComponent]); // Reload component when reloadComponent changes

  //

  const userData = JSON.parse(localStorage.getItem("userData"));
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
    } catch (error) {
      console.log("Error occurred while rejecting email:", error);
      // Handle error
    }
  };

  const handleEditEmail = (
    emailId,
    recipient,
    subject,
    message,
    scheduledSendTime
  ) => {
    setEditMode(emailId);
    setEditedRecipient(recipient);
    setEditedSubject(subject);
    setEditedMessage(message);
    setEditedScheduledSendTime(scheduledSendTime);
  };

  //
  const handleSaveEmail = async (emailId) => {
    const token = localStorage.getItem("token");
    // Prepare the data to be sent in the request
    const requestData = {
      recipient: editedRecipient,
      subject: editedSubject,
      message: editedMessage,
      scheduledSendtime: editedScheduledSendTime,
    };
    // Send a fetch request to update the email
    fetch(`http://localhost:5000/email/update-requested-email/${emailId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => {
        if (!response.ok) {
          // throw new Error(`HTTP Error! Status: ${response.status}`);
          setResponseMessage("Email was not updated");
        }
        setEditMode(null); // Exit edit mode
        return response.json();
      })
      .then((data) => {
        // Handle the success response
        console.log("Email has been updated successfully:", data);
        setEditMode(null); // Exit edit mode
        // Display the response message on the screen
        setResponseMessage("Email updated successfully.");
        setShowAlert(true); // Show the response message alert
        triggerComponentReload(); // Trigger the component reload
      })
      .catch((error) => {
        // Handle errors if the request fails
        console.error("Error updating email:", error);
        setResponseMessage("Error updating email. Please try again.");
        setShowAlert(true); // Show the error message alert
      });
  };

  //
  const responses = [];
  const projectData = [];


  return (
    <Container>
      <h2 className="text-center mb-4">Email List for Verification</h2>
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
              <td>
                {editMode === email._id ? (
                  <input
                    type="text"
                    value={editedRecipient}
                    onChange={(e) => setEditedRecipient(e.target.value)}
                  />
                ) : (
                  email.recipient
                )}
              </td>
              <td>
                {editMode === email._id ? (
                  <input
                    type="text"
                    value={editedSubject}
                    onChange={(e) => setEditedSubject(e.target.value)}
                  />
                ) : (
                  email.subject
                )}
              </td>
              <td>
                {editMode === email._id ? (
                  <input
                    type="text"
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                ) : (
                  email.message
                )}
              </td>
              <td>
                {editMode === email._id ? (
                  <input
                    type="datetime-local" // Use a datetime-local input for scheduledSendTime
                    value={editedScheduledSendTime}
                    onChange={(e) => setEditedScheduledSendTime(e.target.value)}
                  />
                ) : (
                  formatTime(email.scheduledSendTime)
                )}
              </td>
              <td>
                {editMode === email._id ? (
                  <Button
                    variant="success"
                    onClick={() =>
                      handleSaveEmail(
                        email._id,
                        email.recipient,
                        email.subject,
                        email.message
                      )
                    }
                  >
                    Save
                  </Button>
                ) : (
                  <>
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
                    <Button
                      variant="info"
                      onClick={() =>
                        handleEditEmail(
                          email._id,
                          email.recipient,
                          email.subject,
                          email.message,
                          email.scheduledSendTime
                        )
                      }
                    >
                      Edit
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default EmailList;
