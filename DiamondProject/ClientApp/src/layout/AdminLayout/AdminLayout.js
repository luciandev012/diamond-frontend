import React from "react";
import Navigation from "./Navigation";
import SideContent from "./SideContent";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./admin.css";
import useAuth from "../../hooks/useAuth";

export default function AdminLayout() {
  const { auth } = useAuth();
  const location = useLocation();
  return auth?.accessToken ? (
    <>
      <Navigation />
      <div id="layoutSidenav">
        <SideContent />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}
