import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

//
import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement } from "../redux/admin";
import { setAdminTrue, setAdminFalse } from "../redux/admin";

//
const SignIn = () => {
  // const { count } = useSelector((state) => state.counter);
  const { admin } = useSelector((state) => state.admin); // Change admin state to

  const dispatch = useDispatch();
  //

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();

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

      if (
        data.message === "Congratulations! You have been successfully logged in"
      ) {
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(data.User));
        localStorage.setItem("token", data.token);
        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 1 day in milliseconds
        localStorage.setItem("tokenExpiration", expirationTime);
        // const expirationTime = new Date().getTime() + 10 * 1000; // 10 seconds in milliseconds
        // localStorage.setItem("tokenExpiration", expirationTime);

        console.log(data.User.userRole);
        if (data.User.userRole === "admin") {
          dispatch(setAdminTrue("admin"));
          localStorage.setItem("reduxState", "admin");
        }
      }

      // Navigate to the home page
      navigate("/home-page");
      // Refresh the whole app
      window.location.reload();

      // Reset the form
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="container bg-gray-200 rounded-tr-3xl rounded-bl-3xl"
      style={combinedContainerStyle}
    >
      <Container>
        <Row className="mt-5 justify-content-center">
          <Col md={6}>
            <h1
              className="mt-2 mb-4 font-serif text-center"
              style={{ color: "#005055" }}
            >
              Sign in
            </h1>
            {showAlert && (
              <Alert variant="success" className="fade-out">
                {alertMessage}
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail">
                <Form.Label className="font-serif" style={headerStyle}>
                  Email address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter email"
                  className="font-mono"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={fieldStyle}
                />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label className="font-serif" style={headerStyle}>
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  className="font-mono"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={fieldStyle}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="mt-3 w-100"
                style={buttonColors}
              >
                Sign in
              </Button>
              <p
                className="mt-3 font-mono text-center"
                style={{ color: "#007D69" }}
              >
                If you have not created an account,
                <Link to="/sign-up">create one</Link>.
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignIn;

//
const containerDivStyle = {
  width: "100%", // Set to 100% for mobile screens
  maxWidth: "1200px", // Adjust this value based on your design needs
  height: "630px",
  justifyContent: "center",
  alignItems: "center",
};
const mobileStyles = {
  width: "100%", // Adjust these styles for mobile screens
  marginLeft: "10px !important",
  marginRight: "5px !important",
};

// Combine styles based on screen size
const combinedContainerStyle = {
  ...containerDivStyle,
  // Apply additional styles for smaller screens (mobile)
  "@media only screen and (max-width: 767px)": mobileStyles,
};
//

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
