import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
//redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

//
// const callBackendAPI = () => {
//   console.log("callBackendAPI has been called");
//   // Make your API call here
//   // You can use libraries like Axios or the built-in fetch API to make the HTTP request
// };
// //
const callBackendAPI = () => {
  console.log("callBackendAPI has been called");

  // Define the API endpoint
  const token = localStorage.getItem("token");

  // Make an HTTP GET request using the fetch API
  fetch(`http://localhost:5000/project/popup`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        // throw new Error("Network response was not ok");
      }
      return response.json(); // You can use .json() if the response is in JSON format
    })
    .then((data) => {
      // Handle the API response data here
      console.log("API response:", data);
      Notification.requestPermission().then((perm) => {
        const responses = data.responses;
        const pName = data.projectName;
        const organizationName = data.clientOrganization;
        console.log("responses=" + responses);
        if (perm === "granted") {
          for (let i = 0; i < responses.length; i++) {
            const days = responses[i];
            console.log("days = " + days);
            const projectName = pName[i];
            const client = organizationName[i];
            console.log("days=" + days);
            new Notification("Alert Notification", {
              body: `${days} days are left for an email to be sent to ${client} for the ${projectName} project`,
              sound: "default", // Use the default notification sound
              icon: "https://www.google.com/url?sa=i&url=https%3A%2F%2Freact.dev%2F&psig=AOvVaw0tYaXRjRiWV38Yh5hvqNVp&ust=1699355644449000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPCqi5-fr4IDFQAAAAAdAAAAABAE", // Replace with the URL of a JavaScript-related icon
            });
          }
        }
      });
    })
    .catch((error) => {
      console.error("Error calling the API:", error);
    });
};

// Call the function to make the API request
callBackendAPI();

//
// call above
// Schedule the API call to run every hour at the 00-minute mark
const scheduleHourlyApiCall = () => {
  const now = new Date();
  const minutesUntilNextHour = 60 - now.getMinutes();
  setTimeout(() => {
    callBackendAPI();
    // Call the function immediately when the app starts
    setInterval(callBackendAPI, 60 * 60 * 1000); // Call every hour
  }, minutesUntilNextHour * 60 * 1000);
};

scheduleHourlyApiCall();

//

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
///
