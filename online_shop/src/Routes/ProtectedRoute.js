import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("userData");

  if (isAuthenticated) return children;

  return <Navigate to="/account" />;
};

export default ProtectedRoute;
