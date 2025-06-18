import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
