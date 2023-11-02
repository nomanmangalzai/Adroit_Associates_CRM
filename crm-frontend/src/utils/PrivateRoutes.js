import { Outlet, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// const { admin } = useSelector((state) => state.admin);
// console.log("admin=" + admin);

const PrivateRoutes = () => {
  // const { admin } = useSelector((state) => state.admin);
  const reduxAdminState = localStorage.getItem("reduxState");

  // const storedIsAdmin = localStorage.getItem("isAdmin");
  // console.log("admin=" + admin);
  // const [isAdmin, setIsAdmin] = useState(!!storedIsAdmin);
  // useEffect(() => {
  //   const token = localStorage.getItem("isAdmin");
  //   setIsAdmin(!!storedIsAdmin);
  // }, []);
  // return admin ? <Outlet /> : <Navigate to="/sign-in" />;
  if (reduxAdminState === "admin") {
    return reduxAdminState ? <Outlet /> : <Navigate to="/sign-in" />;
  } else {
    return <h1>This page is for admin only</h1>;
  }
};

export default PrivateRoutes;
