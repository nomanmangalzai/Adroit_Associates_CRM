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
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  // const history = useHistory();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:5000/authUser/user-account-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResponseMessage(data.message); // Store the response message in state
        setShowResponse(true); // Show the response message

        setTimeout(() => {
          setShowResponse(false); // Hide the response message after 2 seconds
          // history.push("/sign-in"); // Redirect to the sign-in page
          navigate("/sign-in", { replace: true });
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
    <Container className="container mt-5" style={containerDivStyle}>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mt-3 font-serif">Signup</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form as={BootstrapForm}>
              <BootstrapForm.Group controlId="firstName">
                <BootstrapForm.Label
                  className="font-serif "
                  style={headerStyle}
                >
                  First Name
                </BootstrapForm.Label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="enter your first name"
                  className="form-control font-mono "
                  style={fieldStyle}
                />
                <ErrorMessage
                  name="firstName"
                  component={BootstrapForm.Text}
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="lastName">
                <BootstrapForm.Label className="font-serif" style={headerStyle}>
                  Last Name
                </BootstrapForm.Label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="enter your last name"
                  className="form-control font-mono"
                  style={fieldStyle}
                />
                <ErrorMessage
                  name="lastName"
                  component={BootstrapForm.Text}
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label className="font-serif" style={headerStyle}>
                  Email address
                </BootstrapForm.Label>
                <Field
                  type="email"
                  name="email"
                  placeholder="enter your email address"
                  className="form-control font-mono"
                  style={fieldStyle}
                />
                <ErrorMessage
                  name="email"
                  component={BootstrapForm.Text}
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="password">
                <BootstrapForm.Label className="font-serif" style={headerStyle}>
                  Password
                </BootstrapForm.Label>
                <Field
                  type="password"
                  name="password"
                  placeholder="password"
                  className="form-control font-mono"
                  style={fieldStyle}
                />
                <ErrorMessage
                  name="password"
                  component={BootstrapForm.Text}
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <BootstrapForm.Group controlId="confirmPassword">
                <BootstrapForm.Label className="font-serif" style={headerStyle}>
                  Confirm Password
                </BootstrapForm.Label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  className="placeholder-text-sm text-gray-500 form-control font-mono"
                  style={fieldStyle}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component={BootstrapForm.Text}
                  className="text-danger"
                />
              </BootstrapForm.Group>

              <Button
                type="submit"
                variant="primary"
                className="w-100 mt-3"
                style={buttonColors}
              >
                Signup
              </Button>
            </Form>
          </Formik>

          <Fade in={showResponse}>
            <div className="mt-3">
              <Alert variant="success">{responseMessage}</Alert>
            </div>
          </Fade>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;

//
const containerDivStyle = {
  backgroundColor: "#f0f0f0",
  width: "1250px",
  height: "650px",
  borderTopRightRadius: "50px", // Adjust the values for the desired curvature
  borderBottomLeftRadius: "50px", // Adjust the values for the desired curvature
  justifyContent: "center",
  alignItems: "center",
};

const buttonColors = {
  background: "linear-gradient(to right, #2493B3, #60BA5E)",
  height: " 58px",
  borderRadius: "0 0 0 10px",
};

const fieldStyle = {
  height: "51px",
  borderRadius: "0 0 0 10px",
  fontSize: "0.75rem",
};

const headerStyle = {
  color: "#005055",
};
