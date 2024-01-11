import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";

const NewsletterForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  //redux actions

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const data = {
      title: values.title,
      message: values.message,
    };

    // Send a POST request to the server using fetch
    fetch("http://localhost:5000/newsletter/send-newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        // Handle the response from the server
        console.log(result);

        // Reset the form
        resetForm();
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Error:", error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container bg-gray-200 md:w-1250 rounded-tr-3xl rounded-bl-3xl">
      <Container className="mx-auto mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8}>
            <h2 className="mt-2 mb-1 text-center">Send Email</h2>
            <Formik
              initialValues={{
                title: "Monthly Newsletter",
                message:
                  "\n\nWe hope this newsletter finds you in good health.\nAs the team at Adroit Associates, we wanted to take a moment to update you on recent developments, share exciting news, and express our gratitude for your continued trust and support. Thank you for choosing Adroit Associates as your trusted partner. We look forward to a prosperous future together.\n\nAt Adroit Associates, we believe that true success lies in forging strong relationships and working together towards common goals. We are immensely grateful for your trust, and we remain dedicated to providing you with exceptional service, innovative solutions, and valuable insights to help you thrive in today's dynamic business environment. Adroit Associates",
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Title</BootstrapForm.Label>
                    <div className="input-group">
                      <Field
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                      />
                    </div>
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                  <BootstrapForm.Group className="mb-3">
                    <BootstrapForm.Label>Message</BootstrapForm.Label>
                    <div className="input-group">
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        className="form-control"
                        style={{ height: "420px", borderRadius: "0 0 0 10px" }}
                      />
                    </div>
                    <ErrorMessage
                      name="message"
                      component="div"
                      className="text-danger"
                    />
                  </BootstrapForm.Group>
                  <div className="d-grid">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="h-12 mb-3 rounded-b-md"
                      style={buttonColors}
                    >
                      {isSubmitting ? "Sending..." : "Send"}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NewsletterForm;

// const buttonColors = {
//   background: "linear-gradient(to right, #2493B3, #60BA5E)",
// };

const buttonColors = {
  background: "linear-gradient(to right, #2493B3, #60BA5E)",
  height: " 58px",
  borderRadius: "0 0 0 10px",
};

const containerDivStyle = {
  // width: "1250px",
  // height: "700px",
  borderTopRightRadius: "50px", // Adjust the values for the desired curvature
  borderBottomLeftRadius: "50px", // Adjust the values for the desired curvature
};

const fieldStyle = {
  height: "51px",
  borderRadius: "0 0 0 10px",
};
