import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form as BootstrapForm, Button, Alert, Fade } from 'react-bootstrap';

const EmailForm = () => {
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState('success');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Retrieve firstName and lastName from localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));
      const { firstName, lastName, email} = userData;
  
      // Add firstName and lastName to the values object
      const updatedValues = { ...values, firstName, lastName, email };
  
      const response = await fetch('http://localhost:5000/email/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedValues),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setAlertVariant('success');
        setAlertMessage(data.message);
        resetForm();
      } else {
        setAlertVariant('danger');
        setAlertMessage(data.error);
      }
    } catch (error) {
      console.log('An error occurred while sending the email:', error);
      setAlertVariant('danger');
      setAlertMessage('An error occurred while sending the email.');
    } finally {
      setSubmitting(false);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };

  const validationSchema = Yup.object().shape({
    recipient: Yup.string().email('Invalid email address').required('Recipient is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
    scheduledSendTime: Yup.date().nullable(),
  });

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="text-center mb-4">Send Email</h2>
          <Fade in={showAlert}>
            <div className="mb-3">
              {alertMessage && (
                <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                  {alertMessage}
                </Alert>
              )}
            </div>
          </Fade>
          <Formik
            initialValues={{ recipient: '', subject: '', message: '', scheduledSendTime: null }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Recipient:</BootstrapForm.Label>
                  <Field type="email" id="recipient" name="recipient" className="form-control" />
                  <ErrorMessage name="recipient" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Subject:</BootstrapForm.Label>
                  <Field type="text" id="subject" name="subject" className="form-control" />
                  <ErrorMessage name="subject" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Message:</BootstrapForm.Label>
                  <Field as="textarea" id="message" name="message" className="form-control" rows={4} />
                  <ErrorMessage name="message" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <BootstrapForm.Group className="mb-3">
                  <BootstrapForm.Label>Scheduled Send Time:</BootstrapForm.Label>
                  <Field type="datetime-local" id="scheduledSendTime" name="scheduledSendTime" className="form-control" />
                  <ErrorMessage name="scheduledSendTime" component="div" className="text-danger" />
                </BootstrapForm.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="primary"
                    className="btn-lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Email'}
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


//

