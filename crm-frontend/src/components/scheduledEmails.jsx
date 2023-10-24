import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, ListGroup } from "react-bootstrap";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const fetchEmails = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch("http://localhost:5000/email/fetch-emails", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

  const handleEditClick = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => {
        if (email._id === emailId) {
          return { ...email, editable: true };
        }
        return email;
      })
    );
  };

  const handleSaveChanges = (emailId) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) => {
        if (email._id === emailId) {
          return { ...email, editable: false };
        }
        return email;
      })
    );
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Email List</h2>
      <ListGroup>
        {emails.map((email) => (
          <ListGroup.Item
            key={email._id}
            className="bg-light p-3 mb-3"
            style={{ fontFamily: "Verdana" }}
          >
            <strong className="text-primary">Recipient:</strong>{" "}
            {email.recipient}
            <br />
            <strong className="text-success">Subject:</strong> {email.subject}
            <br />
            <strong className="text-danger">Message:</strong> {email.message}
            <br />
            <strong className="text-purple">Scheduled Send Time:</strong>{" "}
            {formatTime(email.scheduledSendTime)}
            <br />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default EmailList;
