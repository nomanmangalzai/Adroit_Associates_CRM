import React, { useState, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";

const ProjectData = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/project/view-projects",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProjectData(data);
      } else {
        throw new Error("Error fetching project data");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching project data");
    }
  };

  return (
    <div className="container" style={combinedContainerStyle}>
      <Row>
        <h2 className="text-center">Project Data</h2>
        <Table
          className="rounded-tr-3xl rounded-bl-3xl"
          striped
          bordered
          hover
          style={{
            borderCollapse: "collapse",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Project Name</th>
              <th style={thStyle}>Client</th>
              <th style={thStyle}>Client POC</th>
              <th style={thStyle}>POC E.Address</th>
              <th style={thStyle}>Starting Date</th>
              <th style={thStyle}>End Date</th>
              <th style={thStyle}>Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {projectData.map((project) => (
              <tr key={project._id}>
                <td>{project.projectName}</td>
                <td>{project.client}</td>
                <td>{project.clientPOC}</td>
                <td>{project.pocEmailAddress}</td>
                <td>{project.projectStartingDate}</td>
                <td>{project.projectEndDate}</td>
                <td>{project.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </div>
  );
};

export default ProjectData;

//
const thStyle = {
  backgroundColor: "#007777",
  color: "white",
  border: "none" /* Remove all borders */,
  height: "45px",
  lineHeight: "45px", // Set line-height to match the height
  fontStyle: "italic", // Add this line to apply italic font style
};

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
