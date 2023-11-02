/////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Button,
} from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form } from "formik";

//
import Modal from "react-modal";

import { useDispatch, useSelector } from "react-redux";
import { setPopupTrue, setPopupFalse } from "../redux/popup"; // Adjust the relative path based on your project structure

/////////////////////////////////////////////////////
const NewsletterForm = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //
  //
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.popup);
  localStorage.setItem("popup", isPopupOpen.popup);

  //
  //redux actions
  const handleOpenPopup = () => {
    dispatch(setPopupTrue());
    setIsModalOpen(true);
  };

  const handleClosePopup = () => {
    dispatch(setPopupFalse());
    setIsModalOpen(false);
  };

  //
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Send Email</h2>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            style={{
              content: {
                width: "calc(100% / 10)", // Set the width to one twelfth of the container
                height: "25%", // Adjust the height as needed
                fontFamily: "Arial, sans-serif", // Set the font family
              },
              overlay: {
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the overlay color
              },
            }}
          >
            <Button onClick={closeModal}>x</Button>
            <div
              style={{ fontWeight: "bold", fontSize: "16px", margin: "10px 0" }}
            >
              15 days are left until an automated email is sent to the client.
            </div>
          </Modal>
          <button onClick={handleOpenPopup}>Open Pop-up</button>

          <Formik
            initialValues={{
              title: "Monthly Newsletter",
              message:
                "We hope this newsletter finds you in good health and high spirits. As the team at Adroit Associates, we wanted to take a moment to update you on recent developments, share exciting news, and express our gratitude for your continued trust and support. Thank you for choosing Adroit Associates as your trusted partner. We look forward to a prosperous future together.\n\nAt Adroit Associates, we believe that true success lies in forging strong relationships and working together towards common goals. We are immensely grateful for your trust, and we remain dedicated to providing you with exceptional service, innovative solutions, and valuable insights to help you thrive in today's dynamic business environment. Adroit Associates",
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
                      style={{ height: "500px" }}
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
  );
};

export default NewsletterForm;
