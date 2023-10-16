import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Form as BootstrapForm, Button, Alert, Fade } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const history = useHistory();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch('http://localhost:5000/authUser/user-account-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message); // Store the response message in state
        setShowResponse(true); // Show the response message

        setTimeout(() => {
          setShowResponse(false); // Hide the response message after 2 seconds
          history.push('/sign-in'); // Redirect to the sign-in page
        }, 2000);
      } else {
        const error = await response.json();
        setResponseMessage(error.message); // Store the error message in state
        setShowResponse(true); // Show the error message

        setTimeout(() => {
          setShowResponse(false); // Hide the error message after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.log(error); // Handle network or other runtime errors
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center">Signup</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form as={BootstrapForm}>
              <BootstrapForm.Group controlId="firstName">
                <BootstrapForm.Label>First Name</BootstrapForm.Label>
                <Field type="text" name="firstName" className="form-control" />
                <ErrorMessage name="firstName" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="lastName">
                <BootstrapForm.Label>Last Name</BootstrapForm.Label>
                <Field type="text" name="lastName" className="form-control" />
                <ErrorMessage name="lastName" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field type="email" name="email" className="form-control" />
                <ErrorMessage name="email" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label>Password</BootstrapForm.Label>
                <Field type="password" name="password" className="form-control" />
                <ErrorMessage name="password" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="confirmPassword">
                <BootstrapForm.Label>Confirm Password</BootstrapForm.Label>
                <Field type="password" name="confirmPassword" className="form-control" />
                <ErrorMessage name="confirmPassword" component={BootstrapForm.Text} className="text-danger" />
              </BootstrapForm.Group>

              <Button type="submit" variant="primary" className="w-100 mt-3">Signup</Button>
            </Form>
          </Formik>

          <Fade in={showResponse}>
            <div className="mt-3">
              <Alert variant="success">
                {responseMessage}
              </Alert>
            </div>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;