import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../App.css";

const CrmCalendarData = () => {
  const [crmData, setCrmData] = useState([]);

  useEffect(() => {
    fetchCrmData();
  }, []);

  // const CrmCalendarData = () => {
  //   const [crmData, setCrmData] = useState([]);
  //   const [selectedItemId, setSelectedItemId] = useState(null);

  //   // ...
  // };

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
    <div className="overflow-x-auto sm:overflow-x-auto md:overflow-x-auto lg:overflow-x-auto xl:overflow-x-auto">
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "#005055" }}>CRM Calendar Data</h1>
      </div>
      <table className="w-full bg-white border border-gray-300 rounded table-auto">
        <thead className="text-white" style={{ backgroundColor: "#005055" }}>
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Organization</th>
            <th className="p-3 text-left">Contact Title</th>
            <th className="p-3 text-left">Phone Number</th>
            <th className="p-3 text-left">Email Address</th>
            <th className="p-3 text-left">Meeting Subject</th>
            <th className="p-3 text-left">Client POC</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Time</th>
            <th className="p-3 text-left">Additional Notes</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {crmData.map((dataItem, index) => (
            <tr key={index} className="border-b border-gray-300">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
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
              <td className="p-3">
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
              <td className="p-3">
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
              <td className="p-3">
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
                    className="text-teal-500"
                  >
                    {dataItem.emailAddress}
                  </a>
                )}
              </td>
              <td className="p-3">
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
              <td className="p-3">
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
              <td className="p-3">
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
              <td className="p-3">
                {dataItem.isEditable ? (
                  <Form.Control
                    type="datetime-local"
                    value={dataItem.date}
                    onChange={(e) =>
                      handleInputChange(index, "date", e.target.value)
                    }
                  />
                ) : (
                  new Date(dataItem.date).toLocaleDateString()
                )}
              </td>
              <td className="p-3">
                {dataItem.isEditable ? (
                  <Form.Control
                    type="text"
                    value={dataItem.time}
                    onChange={(e) =>
                      handleInputChange(index, "time", e.target.value)
                    }
                  />
                ) : (
                  dataItem.time
                )}
              </td>
              <td className="p-3">
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
              <td className="p-3 space-x-2">
                {dataItem.isEditable ? (
                  <>
                    <button
                      className="btn btn-success bg-gradient-to-r from-blue-500 to-green-500"
                      onClick={() => handleSaveClick(index)}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-danger bg-gradient-to-r from-blue-500 to-green-500"
                      onClick={() => handleDeleteClick(index)}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <Button
                    className="btn btn-primary bg-gradient-to-r from-blue-500 to-green-500"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CrmCalendarData;


// //
// const thStyle = {
//   backgroundColor: "#007777",
//   color: "white",
//   border: "none" /* Remove all borders */,
//   height: "45px",
//   lineHeight: "45px", // Set line-height to match the height
//   fontStyle: "italic", // Add this line to apply italic font style
// };

// const tbodyStyle = {
//   backgroundColor: "#f2f2f2",
//   color: "#333",
// };

// const tableCellStyle = {
//   fontStyle: "italic",
// };

// const tdStyle = {
//   color: "#005055",
// };
