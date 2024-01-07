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

//
import { useDispatch, useSelector } from "react-redux";
import { setPopupTrue, setPopupFalse } from "./redux/popup"; // Adjust the relative path based on your project structure
//importing privateRoutes file
import PrivateRoutes from "./utils/PrivateRoutes";

import "./App.css";
import { Button } from "react-bootstrap";
import { faWindowRestore } from "@fortawesome/free-solid-svg-icons";

function App() {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("reduxState");
    localStorage.removeItem("userData");
    localStorage.removeItem("tokenExpiration");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    console.log("handleLogin called");
    // localStorage.setItem("token", storedToken); // Replace 'yourToken' with the actual token

    setIsLoggedIn(true);
    //

    //
  };

  //remove token

  //
  // Function to check and remove expired token from localStorage
  const checkAndRemoveExpiredToken = () => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");

    if (token && expirationTime) {
      const currentTime = new Date().getTime();

      // Check if the token has expired
      if (currentTime > expirationTime) {
        // Token has expired, remove it from localStorage
        localStorage.removeItem("tokenExpiration");
        localStorage.removeItem("userData");
        localStorage.removeItem("reduxState");
        localStorage.removeItem("token");

        // Redirect to the sign-in page
        window.location.href = "/sign-in"; // Change "/signin" to the actual path of your sign-in page
      }
    }
  };

  // Call the function to check and remove expired token when your app starts
  setInterval(checkAndRemoveExpiredToken, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 milliseconds
  checkAndRemoveExpiredToken();

  return (
    <div className="wrapper">
      <div className="row">
        <div className="col-sm-12 ">
          <nav
            className="navbar"
            style={{ backgroundColor: "#005055", ...navbarStyle }}
          >
            <ul className="nav-links">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/home-page"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/email-form"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Compose Email
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/show-scheduled-emails"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Scheduled Emails
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/show-emails-history"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/save-crm-calendar-data"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Post a Calendar
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/accept-user-account-request"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Account Requests
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/emails-to-be-verified"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Email Verification
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/projects"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Projects
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/view-projects"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      View Projects
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/newsleter-template"
                      className="nav-link"
                      style={{ color: "white" }}
                    >
                      Newsletter
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="ml-auto nav-links">
              {!isLoggedIn && (
                <li>
                  <Link
                    to="/sign-in"
                    className="nav-link"
                    style={{ color: "white" }}
                  >
                    Sign in
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li>
                  <Link
                    to="/sign-in"
                    className="nav-link"
                    onClick={handleLogout}
                    style={{ color: "white" }}
                  >
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
        </div>
      </div>
    </div>
  );
}

export default App;

//
const navbarStyle = {
  lineHeight: "8px",
};
