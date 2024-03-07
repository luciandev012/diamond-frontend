import React from "react";
import Navigation from "./Navigation";
import SideContent from "./SideContent";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  const location = useLocation();
  const accessToken = window.localStorage.getItem("accessToken");

  return accessToken ? (
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
