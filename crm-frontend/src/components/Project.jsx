import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Container, Row, Alert } from "react-bootstrap";

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
    <Container>
      <Row>
        <h2 className="text-center">Project Form</h2>
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
                <label>Project Name:</label>
                <Field
                  type="text"
                  name="projectName"
                  className="form-control"
                />
                <ErrorMessage
                  name="projectName"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Client:</label>
                <Field type="text" name="client" className="form-control" />
                <ErrorMessage
                  name="client"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Client POC:</label>
                <Field type="text" name="clientPOC" className="form-control" />
                <ErrorMessage
                  name="clientPOC"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="form-group">
                <label>Client POC E.Address:</label>
                <Field
                  type="email"
                  name="pocEmailAddress"
                  className="form-control"
                />
                <ErrorMessage
                  name="pocEmailAddress"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Project Starting Date:</label>
                <Field
                  type="datetime-local"
                  name="projectStartingDate"
                  className="form-control"
                />
                <ErrorMessage
                  name="projectStartingDate"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Project End Date:</label>
                <Field
                  type="datetime-local"
                  name="projectEndDate"
                  className="form-control"
                />
                <ErrorMessage
                  name="projectEndDate"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="form-group">
                <label>Assigned To:</label>
                <Field type="text" name="assignedTo" className="form-control" />
                <ErrorMessage
                  name="assignedTo"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={isSubmitting}
              >
                Save Project
              </button>
            </Form>
          )}
        </Formik>
      </Row>
    </Container>
  );
};

export default ProjectForm;
