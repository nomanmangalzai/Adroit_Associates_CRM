import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import EmailForm from "./components/composeEmail";
import EmailList from "./components/scheduledEmails";
import EmailHistory from "./components/EmailHistory";
import SaveCrmCalendarData from "./components/SaveCrmCalendarData";
import SignUpPermission from "./components/SignUpPermission";
import EmailVerificatoinList from "./components/EmailVerificatoinList";
import Project from "./components/Project";
import ShowProjects from "./components/ShowProjects";
import Newsletter from "./components/NewsletterTemplate";
import Modal from "react-modal";

//
import { useDispatch, useSelector } from "react-redux";
import { setPopupTrue, setPopupFalse } from "./redux/popup"; // Adjust the relative path based on your project structure
//importing privateRoutes file
import PrivateRoutes from "./utils/PrivateRoutes";

import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  //
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentHour = now.getHours();

      if (currentHour >= 7 && currentHour <= 16 && currentHour !== 12) {
        handlePopup();
      }
    }, 58 * 60 * 1000); // Execute every 58 minutes

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  //
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  //popup
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state) => state.popup);
  const handleOpenPopup = () => {
    dispatch(setPopupTrue());
  };

  const handleClosePopup = () => {
    dispatch(setPopupFalse());
  };
  //

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("reduxState");
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    localStorage.setItem("token", storedToken); // Replace 'yourToken' with the actual token
    setIsLoggedIn(true);
  };

  //project name to be used in popup
  var projectName = "Chicken Distribution";
  const handlePopup = async () => {
    const token = localStorage.getItem("token");
    //   const response = await fetch(

    const response = await fetch(
      "http://localhost:5000/project/view-projects?popup=popup",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // const data = await response.json();
    if (response.ok) {
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        console.log(data.responses);
      }

      openModal();
    }
  };

  //
  const customStyles = {
    content: {
      width: "15%", // Set the width to 25% of the available space
      height: "25%", // You can adjust the height as needed
      top: "0", // Position it at the top
      left: "0", // Position it at the left
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
    },
  };
  //
  return (
    <>
      <button onClick={handlePopup}>Open Modal</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={customStyles}
      >
        <h2>Modal Title</h2>
        <p>
          15 days are left so that an email will be sent to the client for
          {projectName} project.
        </p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
      <nav className="navbar">
        <ul className="nav-links">
          {isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/home-page" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/email-form" className="nav-link">
                  Compose Email
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/show-scheduled-emails" className="nav-link">
                  Scheduled Emails
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/show-emails-history" className="nav-link">
                  History
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/save-crm-calendar-data" className="nav-link">
                  Post a Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/accept-user-account-request" className="nav-link">
                  Account Requests
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/emails-to-be-verified" className="nav-link">
                  Email Verification
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/projects" className="nav-link">
                  Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/view-projects" className="nav-link">
                  View Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/newsleter-template" className="nav-link">
                  Newsletter
                </Link>
              </li>
            </>
          )}
        </ul>
        <ul className="nav-links ml-auto">
          {!isLoggedIn && (
            <li>
              <Link to="/sign-in" className="nav-link">
                SignIn
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/sign-in" className="nav-link" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home-page" />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn onLogin={handleLogin} />} />

        {isLoggedIn && (
          <>
            <Route path="/home-page" element={<Home />} />
            <Route path="/email-form" element={<EmailForm />} />
            <Route path="/show-scheduled-emails" element={<EmailList />} />
            <Route path="/show-emails-history" element={<EmailHistory />} />
            <Route
              path="/save-crm-calendar-data"
              element={<SaveCrmCalendarData />}
            />
            <Route path="/projects" element={<Project />} />
            <Route path="/view-projects" element={<ShowProjects />} />
            <Route path="/newsleter-template" element={<Newsletter />} />
          </>
        )}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/sign-in" />}
        />
        <Route element={<PrivateRoutes />}>
          <Route
            element={<SignUpPermission />}
            path="/accept-user-account-request"
          />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route
            path="/emails-to-be-verified"
            element={<EmailVerificatoinList />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
