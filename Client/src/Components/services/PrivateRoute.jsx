import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./TokenService.js";
import { getRole } from "./RoleService.js";

export function PrivateRoute({ allowedRoles }) {
  const token = getToken();
  const role = getRole();


  if (!token) {
    return <Navigate to="/login" replace />;
  }


  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }


  return <Outlet />;
}
