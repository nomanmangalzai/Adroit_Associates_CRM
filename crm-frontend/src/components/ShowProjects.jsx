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
    <Container>
      <Row>
        <h2 className="text-center">Project Data</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Client</th>
              <th>Client POC</th>
              <th>POC E.Address</th>
              <th>Starting Date</th>
              <th>End Date</th>
              <th>Assigned To</th>
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
    </Container>
  );
};

export default ProjectData;
