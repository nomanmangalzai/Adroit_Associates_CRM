import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Alert, Button } from "react-bootstrap";

const ProjectForm = () => {
  //state
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const initialValues = {
    projectName: "",
    client: "",
    clientPOC: "",
    projectStartingDate: "",
    projectEndDate: "",
    assignedTo: "",
  };

  const validationSchema = Yup.object().shape({
    projectName: Yup.string().required("Project Name is required"),
    client: Yup.string().required("Client is required"),
    clientPOC: Yup.string().required("Client POC is required"),
    pocEmailAddress: Yup.string().required(
      "Client POC's email address is required"
    ),
    projectStartingDate: Yup.string().required("Starting Date is required"),
    projectEndDate: Yup.string().required("End Date is required"),
    assignedTo: Yup.string().required("Assigned To is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const token = localStorage.getItem("token");

    //fetching projectPoster information
    const userDataString = localStorage.getItem("userData");

    // Step 2: Parse the JSON string to a JavaScript object
    const userData = JSON.parse(userDataString);

    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const userName = `${firstName} ${lastName}`;
    const userEmail = userData.email;
    // const userDataToSend = {
    //   userName: userName,
    //   userEmail: userEmail,
    // };
    values.userName = userName;
    values.userEmail = userEmail;
    //
    console.log(values);
    try {
      const response = await fetch(
        "http://localhost:5000/project/save-project-data",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.message);
        setShowSuccessAlert(true);
        resetForm();
      } else {
        throw new Error("Error saving project");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving the project");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container mt-5 bg-gray-200 rounded-tr-3xl rounded-bl-3xl"
      style={combinedContainerStyle}
    >
      <Container>
        <Row>
          <h1 className="mt-3 text-center" style={headerStyle}>
            Project Form
          </h1>
          {showSuccessAlert && (
            <Alert
              variant="success"
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              {successMessage}
            </Alert>
          )}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label style={labelColor}>Project Name:</label>
                  <Field
                    type="text"
                    name="projectName"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="projectName"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label style={labelColor}>Client:</label>
                  <Field
                    type="text"
                    name="client"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="client"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label style={labelColor}>Client POC:</label>
                  <Field
                    type="text"
                    name="clientPOC"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="clientPOC"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <label style={labelColor}>Client POC E.Address:</label>
                  <Field
                    type="email"
                    name="pocEmailAddress"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="pocEmailAddress"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label style={labelColor}>Project Starting Date:</label>
                  <Field
                    type="datetime-local"
                    name="projectStartingDate"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="projectStartingDate"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label style={labelColor}>Project End Date:</label>
                  <Field
                    type="datetime-local"
                    name="projectEndDate"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="projectEndDate"
                    component="div"
                    className="text-danger"
                  />
                </div>

                <div className="form-group">
                  <label style={labelColor}>Assigned To:</label>
                  <Field
                    type="text"
                    name="assignedTo"
                    className="form-control"
                    style={fieldStyle}
                  />
                  <ErrorMessage
                    name="assignedTo"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <Button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ width: "100%", marginTop: "25px", ...buttonstyle }}
                >
                  Save Project
                </Button>
              </Form>
            )}
          </Formik>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectForm;

//
const containerDivStyle = {};

const mediumAndLargeScreens = {
  width: "1053px",
  height: "720px",
};

// Combine styles based on screen size
const combinedContainerStyle = {
  ...containerDivStyle,
  // Apply mediumAndLargeScreens styles only for medium and large screens
  "@media only screen and (min-width: 768px)": mediumAndLargeScreens,
};

const buttonstyle = {
  background: "linear-gradient(to right, #2493B3, #60BA5E)",
  height: " 58px",
  borderRadius: "0 0 0 10px",
};

const labelColor = {
  color: "#647A7D",
};

const headerStyle = {
  color: "#005055",
};

const fieldStyle = {
  height: "51px",
  borderRadius: "0 0 0 10px",
};

// borderBottomLeftRadius: "10px", // Adjust the value for the desired curvature
