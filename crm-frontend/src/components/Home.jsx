import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

import "../App.css";

const CrmCalendarData = () => {
  const [crmData, setCrmData] = useState([]);

  useEffect(() => {
    fetchCrmData();
  }, []);

  const CrmCalendarData = () => {
    const [crmData, setCrmData] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    // ...
  };

  const fetchCrmData = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/crm-calendar/get-crm-calendar-data",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.map((item, index) => ({
          ...item,
          id: index + 1,
          isEditable: false,
        }));
        setCrmData(updatedData);
      } else {
        console.error("Failed to fetch CRM calendar data.");
      }
    } catch (error) {
      console.error("Error fetching CRM calendar data:", error);
    }
  };

  const handleDeleteClick = async (index) => {
    const token = localStorage.getItem("token");

    const itemToDelete = crmData[index];

    try {
      const response = await fetch(
        "http://localhost:5000/crm-calendar/delete-crm-calendar-data",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemToDelete),
        }
      );

      if (response.ok) {
        const updatedCrmData = [...crmData];
        updatedCrmData.splice(index, 1);
        setCrmData(updatedCrmData);
      } else {
        console.error("Failed to delete CRM calendar data.");
      }
    } catch (error) {
      console.error("Error deleting CRM calendar data:", error);
    }
  };

  const handleStatusChange = async (index, value) => {
    const token = localStorage.getItem("token");

    const updatedCrmData = [...crmData];
    updatedCrmData[index].status = value;
    setCrmData(updatedCrmData);

    try {
      const response = await fetch(
        "http://localhost:5000/crm-calendar/update-crm-calendar-data",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCrmData[index]), // Send the entire data object
        }
      );

      if (!response.ok) {
        console.error("Failed to update CRM calendar data.");
      }
    } catch (error) {
      console.error("Error updating CRM calendar data:", error);
    }
  };

  const handleEditClick = (index) => {
    const updatedCrmData = [...crmData];
    updatedCrmData[index].isEditable = true;
    setCrmData(updatedCrmData);
  };

  const handleSaveClick = async (index) => {
    const token = localStorage.getItem("token");

    const updatedCrmData = [...crmData];
    updatedCrmData[index].isEditable = false;
    setCrmData(updatedCrmData);

    try {
      const response = await fetch(
        "http://localhost:5000/crm-calendar/update-crm-calendar-data",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedCrmData[index]), // Send the entire data object
        }
      );

      if (!response.ok) {
        console.error("Failed to update CRM calendar data.");
      }
    } catch (error) {
      console.error("Error updating CRM calendar data:", error);
    }
  };

  //
  const navigate = useNavigate();
  const handleEmailClick = (emailAddress, date, time) => {
    // Perform any necessary actions with the email, date, and time

    // Assuming you are using React Router, you can use the history object to navigate
    navigate("/email-form", {
      state: {
        emailAddress,
        date,
        time,
      },
    });
  };

  //

  const handleInputChange = (index, field, value) => {
    const updatedCrmData = [...crmData];
    updatedCrmData[index][field] = value;
    setCrmData(updatedCrmData);
  };

  return (
    <div className="crm-calendar-container">
      {/* Add a class to the parent container */}
      <h1 className="text-danger">CRM Calendar Data</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th style={{ backgroundColor: "#f8c291", color: "#fff" }}>#</th>
            <th style={{ backgroundColor: "#6ab04c", color: "#fff" }}>
              Organization
            </th>
            <th style={{ backgroundColor: "#82ccdd", color: "#fff" }}>
              Contact Title
            </th>
            <th
              style={{
                backgroundColor: "#fcd34d",
                color: "#fff",
                width: "130px",
              }}
            >
              Phone Number
            </th>
            <th style={{ backgroundColor: "#4b7bec", color: "#fff" }}>
              Email Address
            </th>
            <th style={{ backgroundColor: "#fc5c65", color: "#fff" }}>
              Meeting Subject
            </th>
            <th style={{ backgroundColor: "#45aaf2", color: "#fff" }}>
              Client POC
            </th>
            <th
              style={{
                backgroundColor: "#a55eea",
                color: "#fff",
                width: "150px",
              }}
            >
              Status
            </th>
            <th style={{ backgroundColor: "#20bf6b", color: "#fff" }}>Date</th>
            <th style={{ backgroundColor: "#eb3b5a", color: "#fff" }}>Time</th>
            <th style={{ backgroundColor: "#778ca3", color: "#fff" }}>
              Additional Notes
            </th>
            <th
              style={{
                backgroundColor: "#f8c291",
                color: "#fff",
                width: "100px",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {crmData.map((dataItem, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.organization}
                    onChange={(e) =>
                      handleInputChange(index, "organization", e.target.value)
                    }
                    placeholder="Organization"
                  />
                ) : (
                  dataItem.organization
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.contactTitle}
                    onChange={(e) =>
                      handleInputChange(index, "contactTitle", e.target.value)
                    }
                  />
                ) : (
                  dataItem.contactTitle
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(index, "phoneNumber", e.target.value)
                    }
                  />
                ) : (
                  dataItem.phoneNumber
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.emailAddress}
                    onChange={(e) =>
                      handleInputChange(index, "emailAddress", e.target.value)
                    }
                  />
                ) : (
                  <a
                    href="/email-form"
                    onClick={() =>
                      handleEmailClick(
                        dataItem.emailAddress,
                        dataItem.date,
                        dataItem.time
                      )
                    }
                  >
                    {dataItem.emailAddress}
                  </a>
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.meetingSubject}
                    onChange={(e) =>
                      handleInputChange(index, "meetingSubject", e.target.value)
                    }
                  />
                ) : (
                  dataItem.meetingSubject
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.clientPOC}
                    onChange={(e) =>
                      handleInputChange(index, "clientPOC", e.target.value)
                    }
                  />
                ) : (
                  dataItem.clientPOC
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    as="select"
                    value={dataItem.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Canceled">Canceled</option>
                  </Form.Control>
                ) : (
                  dataItem.status
                )}
              </td>
              <td>{new Date(dataItem.date).toLocaleDateString()}</td>
              <td>{dataItem.time}</td>
              <td>
                {dataItem.isEditable ? (
                  <Form.Control
                    as="textarea"
                    value={dataItem.additionalNotes}
                    onChange={(e) =>
                      handleInputChange(
                        index,
                        "additionalNotes",
                        e.target.value
                      )
                    }
                  />
                ) : (
                  dataItem.additionalNotes
                )}
              </td>
              <td>
                {dataItem.isEditable ? (
                  <button
                    className="btn btn-success"
                    onClick={() => handleSaveClick(index)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                )}
              </td>
              {crmData.map((dataItem, index) => (
                <tr key={index}>
                  <td>
                    {dataItem.isEditable ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(index)}
                      >
                        Delete
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default CrmCalendarData;