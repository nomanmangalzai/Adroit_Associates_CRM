import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { setAdminTrue, setAdminFalse } from "../redux/admin";
import { useDispatch, useSelector } from "react-redux";

const SuperAdminScreen = () => {
  const { admin } = useSelector((state) => state.admin); // Change admin state to
  const dispatch = useDispatch();

  const [userRequests, setUserRequests] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Fetch user requests from the server
    fetchUserRequests();
  }, []);

  const fetchUserRequests = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:5000/authUser/fetch-user-account-requests",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUserRequests(data);
    } catch (error) {
      console.error("Error fetching user requests:", error);
    }
  };

  const approveUserRequest = async (userId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/authUser/sign-up", {
        method: "POST",
        // Add headers if required
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // Add request body data if required
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        setResponseMessage(
          `The user account request has been successfully approved`
        );
        // After approving the request, update the user requests list
        setUserRequests(userRequests.filter((user) => user._id !== userId));
      } else {
        setResponseMessage("Failed to approve user request.");
      }
    } catch (error) {
      console.error("Error approving user request:", error);
    }
  };

  const rejectUserRequest = async (userId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/authUser/remove-user-account-request`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (response.ok) {
        setResponseMessage(
          `User request with ID ${userId} rejected successfully.`
        );
        // After rejecting the request, update the user requests list
        setUserRequests(userRequests.filter((user) => user._id !== userId));
      } else {
        setResponseMessage("Failed to reject user request.");
      }
    } catch (error) {
      console.error("Error rejecting user request:", error);
    }
  };

  return (
    <div>
      <h1>User Account Requests</h1>
      {responseMessage && <p>{responseMessage}</p>}
      {userRequests.length === 0 ? (
        <p>No pending user requests.</p>
      ) : (
        <div className="d-flex flex-wrap">
          {userRequests.map((user) => (
            <Card
              key={user._id}
              className="m-2"
              style={{ width: "18rem", ...cardStyle }}
            >
              <Card.Body>
                <Card.Title>{`${user.firstName} ${user.lastName}`}</Card.Title>
                <Card.Text>Email: {user.email}</Card.Text>
                <Button
                  variant="success"
                  onClick={() => approveUserRequest(user._id)}
                  style={{marginRight:"1px",...buttonColors}}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  onClick={() => rejectUserRequest(user._id)}
                  style={{width:"95px",...buttonColors}}
                >
                  Reject
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
  // }
};
export default SuperAdminScreen;

//
const buttonColors = {
  background: "linear-gradient(to right, #2493B3, #60BA5E)",
};

const cardStyle = {
  borderTopRightRadius: "20px", // Adjust the values for the desired curvature
  borderBottomLeftRadius: "20px", // Adjust the values for the desired curvature
};
