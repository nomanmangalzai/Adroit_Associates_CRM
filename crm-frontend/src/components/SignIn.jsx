import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
//
import { useSelector, useDispatch } from "react-redux";
import { setAdminStatus } from "../utils/userSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (showAlert) {
  //     const timeout = setTimeout(() => {
  //       setShowAlert(false);
  //       if (
  //         alertMessage ===
  //         "Congratulations! You have been successfully logged in"
  //       ) {
  //         history.push("/home-page");
  //       }
  //     }, 3000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [showAlert, alertMessage, history]);

  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setShowAlert(false);
        if (
          alertMessage ===
          "Congratulations! You have been successfully logged in"
        ) {
          navigate("/home-page");
        }
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showAlert, alertMessage, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/authUser/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      setAlertMessage(data.message);
      setShowAlert(true);

      // if (data.message === 'Congratulations! You have been successfully logged in') {
      //   // Store user data in local storage
      //   localStorage.setItem('userData', JSON.stringify(data.User));
      //   localStorage.setItem('token', data.token);
      //   history.push('/home-page');
      // }

      if (
        data.message === "Congratulations! You have been successfully logged in"
      ) {
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(data.User));
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", JSON.stringify(data.User.isAdmin));

        // Navigate to the home page
        // history.push("/home-page");
        navigate("/home-page");
        // Refresh the whole app
        window.location.reload();
      }

      // Reset the form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const isAdmin = useSelector((state) => state.user.isAdmin);

  const dispatch = useDispatch();

  const toggleAdminStatus = () => {
    dispatch(setAdminStatus(!isAdmin));
  };

  return (
    <Container>
      <h2>Admin Status: {isAdmin ? "true" : "false"}</h2>
      {/* <button onClick={toggleAdminStatus}>Toggle Admin Status</button> */}
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1 className="text-center mb-4">Sign In</h1>
          {showAlert && (
            <Alert variant="success" className="fade-out">
              {alertMessage}
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign In
            </Button>

            <p className="mt-3 text-center">
              If you have not created an account,{" "}
              <Link to="/sign-up">create one</Link>.
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
