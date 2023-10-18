import "bootstrap/dist/css/bootstrap.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import EmailForm from "./components/composeEmail";
import EmailList from "./components/scheduledEmails";
import EmailHistory from "./components/EmailHistory";
import SaveCrmCalendarData from "./components/SaveCrmCalendarData";
import signUpPermission from "./components/signUpPermission";
import Learn from "./components/Learn";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
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
    localStorage.setItem("token", "yourToken"); // Replace 'yourToken' with the actual token
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Route exact path="/">
        {isLoggedIn ? <Redirect to="/home-page" /> : <Redirect to="/sign-in" />}
      </Route>

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

      <Route exact path="/sign-up" component={SignUp} />
      <Route
        exact
        path="/sign-in"
        render={() => <SignIn onLogin={handleLogin} />}
      />

      {isLoggedIn && (
        <>
          <Route path="/home-page" component={Home} />
          <Route exact path="/email-form" component={EmailForm} />
          <Route exact path="/show-scheduled-emails" component={EmailList} />
          <Route exact path="/show-emails-history" component={EmailHistory} />
          <Route
            exact
            path="/save-crm-calendar-data"
            component={SaveCrmCalendarData}
          />
          <Route
            exact
            path="/accept-user-account-request"
            component={signUpPermission}
          />
          <Route path="/learn" component={Learn} />
        </>
      )}

      {!isLoggedIn && <Redirect to="/sign-in" />}
    </BrowserRouter>
  );
}

export default App;
