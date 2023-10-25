// //above is working code

// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import {
//   Container,
//   Row,
//   Col,
//   Form as BootstrapForm,
//   Button,
//   Alert,
//   Fade,
// } from "react-bootstrap";
// import { useLocation } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
// import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

// const EmailForm = () => {
//   const location = useLocation();
//   const { emailAddress, date, time } = location.state || {};

//   const parsedDate = new Date(date);
//   const year = parsedDate.getUTCFullYear();
//   const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
//   const day = String(parsedDate.getUTCDate()).padStart(2, "0");

//   const formattedDate = `${year}-${month}-${day}`;
//   const dateTime = formattedDate && time ? `${formattedDate}T${time}` : "";

//   const [alertMessage, setAlertMessage] = useState(null);
//   const [alertVariant, setAlertVariant] = useState("success");
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     if (emailAddress && date && time) {
//       setAlertVariant("success");
//       setAlertMessage("Fields are autofilled.");
//       setShowAlert(true);
//     } else {
//       setShowAlert(false);
//     }
//   }, [emailAddress, date, time, setAlertVariant, setAlertMessage]);

//   const handleSubmit = async (values, { setSubmitting, resetForm }) => {
//     const token = localStorage.getItem("token");

//     try {
//       const userData = JSON.parse(localStorage.getItem("userData"));
//       const { firstName, lastName, email } = userData;

//       const updatedValues = { ...values, firstName, lastName, email };

//       const recipientEmails = updatedValues.recipient
//         .split(",")
//         .map((email) => email.trim())
//         .join(", "); // Convert the array of emails to a string

//       const response = await fetch(
//         "http://localhost:5000/email/save-email-for-verification",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({
//             ...updatedValues,
//             recipient: recipientEmails,
//           }),
//         }
//       );

//       const data = await response.json();

//       if (response.ok) {
//         setAlertVariant("success");
//         setAlertMessage(data.message);
//         setShowAlert(true);
//         resetForm();
//       } else {
//         setAlertVariant("danger");
//         setAlertMessage(data.error);
//         setShowAlert(true);
//       }
//     } catch (error) {
//       console.log("An error occurred while sending the email:", error);
//       setAlertVariant("danger");
//       setAlertMessage("An error occurred while sending the email.");
//       setShowAlert(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const validationSchema = Yup.object().shape({
//     recipient: Yup.string()
//       // .email("Invalid email address")
//       .required("Recipient is required"),
//     subject: Yup.string().required("Subject is required"),
//     // subject: Yup.string().nullable(),

//     message: Yup.string().required("Message is required"),
//     scheduledSendTime: Yup.date().nullable(),
//   });

//   const handleSelectAllEmails = async (setFieldValue) => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch("http://localhost:5000/email/all-emails", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (response.ok) {
//         const data = await response.json();
//         const emails = data.map((obj) => obj.emailAddress);
//         console.log("All emails selected:", emails);
//         setFieldValue("recipient", emails.join(", "));
//       } else {
//         throw new Error("Request failed with status: " + response.status);
//       }
//     } catch (error) {
//       console.error("Error selecting all emails:", error);
//     }
//   };

//   return (
//     <Container className="mt-5">
//       <Row className="justify-content-center">
//         <Col xs={12} md={6}>
//           <h2 className="text-center mb-4">Send Email</h2>
//           <Fade in={showAlert}>
//             <div className="mb-3">
//               {showAlert && (
//                 <Alert
//                   variant={alertVariant}
//                   onClose={() => setShowAlert(false)}
//                   dismissible
//                 >
//                   {alertMessage}
//                 </Alert>
//               )}
//             </div>
//           </Fade>
//           <Formik
//             initialValues={{
//               recipient: emailAddress || "",
//               subject: "",
//               message: "",
//               scheduledSendTime: dateTime || null,
//             }}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ isSubmitting, setFieldValue }) => (
//               <Form>
//                 <BootstrapForm.Group className="mb-3">
//                   <BootstrapForm.Label>Recipient:</BootstrapForm.Label>
//                   <div className="input-group">
//                     <span
//                       className="input-group-text"
//                       onClick={() => handleSelectAllEmails(setFieldValue)}
//                       style={{ cursor: "pointer" }}
//                     >
//                       <FontAwesomeIcon icon={faCheckSquare} />
//                     </span>
//                     <Field
//                       type="text"
//                       id="recipient"
//                       name="recipient"
//                       className="form-control"
//                     />
//                   </div>
//                   <ErrorMessage
//                     name="recipient"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </BootstrapForm.Group>
//                 <BootstrapForm.Group className="mb-3">
//                   <BootstrapForm.Label>Subject:</BootstrapForm.Label>
//                   <Field
//                     type="text"
//                     id="subject"
//                     name="subject"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="subject"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </BootstrapForm.Group>
//                 <BootstrapForm.Group className="mb-3">
//                   <BootstrapForm.Label>Message:</BootstrapForm.Label>
//                   <Field
//                     as="textarea"
//                     id="message"
//                     name="message"
//                     className="form-control"
//                     rows={10} // Adjust the number of rows to increase the field area
//                   />
//                   <ErrorMessage
//                     name="message"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </BootstrapForm.Group>
//                 <BootstrapForm.Group className="mb-3">
//                   <BootstrapForm.Label>Schedule Send Time:</BootstrapForm.Label>
//                   <Field
//                     type="datetime-local"
//                     id="scheduledSendTime"
//                     name="scheduledSendTime"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="scheduledSendTime"
//                     component="div"
//                     className="text-danger"
//                   />
//                 </BootstrapForm.Group>
//                 <div className="d-grid">
//                   <Button
//                     variant="primary"
//                     type="submit"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Sending..." : "Send Email"}
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EmailForm;

//
//above is working code

import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
  Alert,
  Fade,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const EmailForm = () => {
  const location = useLocation();
  const { emailAddress, date, time } = location.state || {};

  const parsedDate = new Date(date);
  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  const dateTime = formattedDate && time ? `${formattedDate}T${time}` : "";

  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("success");
  const [showAlert, setShowAlert] = useState(false);

  const handleIconClick = (setFieldValue) => {
    const message = "Thank You Email"; // Customize the message as needed
    setFieldValue("subject", message);
  };

  const handleMessageIconClick = (setFieldValue) => {
    const message = `Dear Alokozay Team,

I wanted to take a moment to express my heartfelt gratitude to you and your team for the outstanding work you did on our previous project together. Your professionalism, expertise, and commitment to delivering high-quality results were truly impressive and greatly appreciated.

Your contributions have made a significant impact on our organization, and we are truly grateful for the time and effort you dedicated to ensuring the success of the project.

Thank you again for your hard work and dedication. We look forward to collaborating with you on future projects and continuing our successful partnership.

Best regards,`;
    // Customize the message as needed
    setFieldValue("message", message);
  };

  useEffect(() => {
    if (emailAddress && date && time) {
      setAlertVariant("success");
      setAlertMessage("Fields are autofilled.");
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [emailAddress, date, time, setAlertVariant, setAlertMessage]);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("token");

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const { firstName, lastName, email } = userData;

      const updatedValues = { ...values, firstName, lastName, email };

      const recipientEmails = updatedValues.recipient
        .split(",")
        .map((email) => email.trim())
        .join(", "); // Convert the array of emails to a string

      const response = await fetch(
        "http://localhost:5000/email/save-email-for-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...updatedValues,
            recipient: recipientEmails,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAlertVariant("success");
        setAlertMessage(data.message);
        setShowAlert(true);
        resetForm();
      } else {
        setAlertVariant("danger");
        setAlertMessage(data.error);
        setShowAlert(true);
      }
    } catch (error) {
      console.log("An error occurred while sending the email:", error);
      setAlertVariant("danger");
      setAlertMessage("An error occurred while sending the email.");
      setShowAlert(true);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    recipient: Yup.string()
      // .email("Invalid email address")
      .required("Recipient is required"),
    subject: Yup.string().required("Subject is required"),
    // subject: Yup.string().nullable(),

    message: Yup.string().required("Message is required"),
    scheduledSendTime: Yup.date().nullable(),
  });

  const handleSelectAllEmails = async (setFieldValue) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/email/all-emails", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const emails = data.map((obj) => obj.emailAddress);
        console.log("All emails selected:", emails);
        setFieldValue("recipient", emails.join(", "));
      } else {
        throw new Error("Request failed with status: " + response.status);
      }
    } catch (error) {
      console.error("Error selecting all emails:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Send Email</h2>
          <Fade in={showAlert}>
            <div className="mb-3">
              {showAlert && (
                <Alert
                  variant={alertVariant}
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  {alertMessage}
                </Alert>
              )}
            </div>
          </Fade>
          <Formik
            initialValues={{
              recipient: emailAddress || "",
              subject: "",
              message: "",
              scheduledSendTime: dateTime || null,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Recipient:</BootstrapForm.Label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      onClick={() => handleSelectAllEmails(setFieldValue)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faCheckSquare} />
                    </span>
                    <Field
                      type="text"
                      id="recipient"
                      name="recipient"
                      className="form-control"
                    />
                  </div>
                  <ErrorMessage
                    name="recipient"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Subject:</BootstrapForm.Label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      onClick={() => handleIconClick(setFieldValue)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                    <Field
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                    />
                  </div>
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                {/* <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Message:</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    className="form-control"
                    rows={10} // Adjust the number of rows to increase the field area
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group> */}
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Message:</BootstrapForm.Label>
                  <div className="input-group">
                    <span
                      className="input-group-text"
                      onClick={() => handleMessageIconClick(setFieldValue)}
                      style={{ cursor: "pointer" }}
                    >
                      <FontAwesomeIcon icon={faCheckCircle} />
                    </span>
                    <Field
                      as="textarea"
                      id="message"
                      name="message"
                      className="form-control"
                      rows={10}
                    />
                  </div>
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Schedule Send Time:</BootstrapForm.Label>
                  <Field
                    type="datetime-local"
                    id="scheduledSendTime"
                    name="scheduledSendTime"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="scheduledSendTime"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Email"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default EmailForm;
