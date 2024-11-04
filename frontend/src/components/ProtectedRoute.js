import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("token"); // or however you're storing the token

  return authToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
