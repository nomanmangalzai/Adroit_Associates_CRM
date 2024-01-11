import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { Link, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  faBars,
  faHome,
  faEnvelope,
  faClock,
  faHistory,
  faCalendarAlt,
  faUser,
  faCheck,
  faProjectDiagram,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ResponsiveComponent from "./components/ResponsiveComponent";

//
import { useDispatch, useSelector } from "react-redux";
import { setPopupTrue, setPopupFalse } from "./redux/popup"; // Adjust the relative path based on your project structure
//importing privateRoutes file
import PrivateRoutes from "./utils/PrivateRoutes";

import "./App.css";

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
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div>
        {/* Mobile Navigation */}
        <nav
          className="navbar d-md-none"
          style={{ backgroundColor: "#005055", ...navbarStyle }}
        >
          <div className="mobile-menu">
            <button
              className="mobile-menu-toggle"
              onClick={handleMobileMenuToggle}
            >
              <FontAwesomeIcon icon={faBars} size="lg" color="white" />
            </button>
            {isMobileMenuOpen && (
              <div className="mobile-menu-dropdown">
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link
                        to="/home-page"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faHome} /> Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/email-form"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faEnvelope} /> Compose Email
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/show-scheduled-emails"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faClock} /> Scheduled Emails
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/show-emails-history"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faHistory} /> History
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/save-crm-calendar-data"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faCalendarAlt} /> Post a Calendar
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/accept-user-account-request"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faUser} /> Account Requests
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/emails-to-be-verified"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faCheck} /> Email Verification
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/projects"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faProjectDiagram} /> Projects
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/view-projects"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faProjectDiagram} /> View
                        Projects
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/newsleter-template"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faNewspaper} /> Newsletter
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to="/responsive"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        <FontAwesomeIcon icon={faNewspaper} />{" "}
                        ResponsiveComponent
                      </Link>
                    </li>
                  </>
                )}
                {!isLoggedIn && (
                  <>
                    <li>
                      <Link
                        to="/sign-in"
                        className="nav-link"
                        style={{ color: "white" }}
                      >
                        Sign in
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
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
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
        <nav
          className="navbar d-none d-md-flex"
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
      </div>
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
            <Route path="/responsive" element={<ResponsiveComponent />} />
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

//
const navbarStyle = {
  lineHeight: "8px",
};
