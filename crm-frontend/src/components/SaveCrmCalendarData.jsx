import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
  Alert,
} from "react-bootstrap";

const validationSchema = Yup.object().shape({
  organization: Yup.string().required("Organization is required"),
  contactTitle: Yup.string().required("Contact Title is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  emailAddress: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
  meetingSubject: Yup.string().required("Meeting Subject is required"),
  clientPOC: Yup.string().required("Client POC is required"),
  date: Yup.date().required("Date is required"),
  time: Yup.string().required("Time is required"),
});

const initialValues = {
  organization: "",
  contactTitle: "",
  phoneNumber: "",
  emailAddress: "",
  meetingSubject: "",
  clientPOC: "",
  status: "Scheduled",
  date: "",
  time: "",
  additionalNotes: "",
};

const SaveCrmCalendarData = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (values) => {
    try {
      const response = await saveCrmCalendarData(values);
      setResponseMessage(response.message);

      // Reset form values
      if (response.ok) {
        // You can add your logic here to handle form reset
      }
    } catch (error) {
      console.error("Failed to save data", error);
    }
  };

  const saveCrmCalendarData = async (data) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/crm-calendar/save-crm-calendar-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        throw new Error("Failed to save data");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Failed to save data", error);
      throw error;
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">CRM Calendar Form</h1>
          {responseMessage && (
            <Alert
              variant={responseMessage.ok ? "success" : "danger"}
              onClose={() => setResponseMessage("")}
              dismissible
            >
              {responseMessage}
            </Alert>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group controlId="organization">
                  <BootstrapForm.Label>Organization</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="organization"
                    name="organization"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="organization"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="contactTitle">
                  <BootstrapForm.Label>Contact Title</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="contactTitle"
                    name="contactTitle"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="contactTitle"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="phoneNumber">
                  <BootstrapForm.Label>Phone Number</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="emailAddress">
                  <BootstrapForm.Label>Email Address</BootstrapForm.Label>
                  <Field
                    type="email"
                    id="emailAddress"
                    name="emailAddress"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="emailAddress"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="meetingSubject">
                  <BootstrapForm.Label>Meeting Subject</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="meetingSubject"
                    name="meetingSubject"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="meetingSubject"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="clientPOC">
                  <BootstrapForm.Label>Client POC</BootstrapForm.Label>
                  <Field
                    type="text"
                    id="clientPOC"
                    name="clientPOC"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="clientPOC"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="date">
                  <BootstrapForm.Label>Date</BootstrapForm.Label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="time">
                  <BootstrapForm.Label>Time</BootstrapForm.Label>
                  <Field
                    type="time"
                    id="time"
                    name="time"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="additionalNotes">
                  <BootstrapForm.Label>Additional Notes</BootstrapForm.Label>
                  <Field
                    as="textarea"
                    id="additionalNotes"
                    name="additionalNotes"
                    className="form-control"
                    rows={3}
                  />
                  <ErrorMessage
                    name="additionalNotes"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-100"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SaveCrmCalendarData;
