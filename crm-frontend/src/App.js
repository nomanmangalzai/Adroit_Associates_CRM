import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import EmailForm from "./components/composeEmail";
import EmailList from "./components/scheduledEmails";
import EmailHistory from "./components/EmailHistory";
import SaveCrmCalendarData from "./components/SaveCrmCalendarData";
import SignUpPermission from "./components/SignUpPermission";
import Learn from "./components/Learn";

//importing privateRoutes file
import PrivateRoutes from "./utils/PrivateRoutes";

import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!storedToken);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    localStorage.setItem("token", storedToken); // Replace 'yourToken' with the actual token
    setIsLoggedIn(true);
  };

  return (
    <>
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
                <Link to="/learn" className="nav-link">
                  Learn
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

            <Route path="/learn" element={<Learn />} />
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
      </Routes>
    </>
  );
}

export default App;
