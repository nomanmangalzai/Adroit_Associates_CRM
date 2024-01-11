import React, { useEffect, useState } from "react";



const fetchEmails = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:5000/email/email-history", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error occurred while fetching emails:", error);
    throw new Error("Failed to fetch emails");
  }
};

const formatTime = (time) => {
  const options = {
    timeZone: "Asia/Kabul",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return new Date(time).toLocaleString("en-US", options);
};

const EmailHistory = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const getEmails = async () => {
      try {
        const data = await fetchEmails();
        setEmails(data);
      } catch (error) {
        // Handle error
      }
    };

    getEmails();
  }, []);
  // bg-gray-100
  return (
    <div
      style={containerDivStyle}
      className="container mx-auto mt-5 bg-gray-100 lg:w-2/3 xl:w-1/2 rounded-tr-3xl rounded-bl-3xl sm:mx-4"
    >
      <div className="overflow-x-auto">
        <h2 className="mb-4 text-3xl text-center text-black">Email List</h2>
        <table className="w-full mt-4 border-collapse">
          <thead className="text-white " style={{ backgroundColor: "#005055" }}>
            <tr>
              <th className="p-2 text-left ">Recipient</th>
              <th className="p-2 text-left ">Subject</th>
              <th className="p-2 text-left ">Message</th>
              <th className="p-2 text-left ">Scheduled Send Time</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email._id} className="bg-gray-100">
                <td className="p-2 border">{email.recipient}</td>
                <td className="p-2 border">{email.subject}</td>
                <td className="p-2 border">{email.message}</td>
                <td className="p-2 border">
                  {formatTime(email.scheduledSendTime)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailHistory;

//
//
const headerStyle = {
  color: "#007D69",
};

const containerDivStyle = {
  height: "700px",
};
