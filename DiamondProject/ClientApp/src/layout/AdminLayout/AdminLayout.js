import React from "react";
import Navigation from "./Navigation";
import SideContent from "./SideContent";
import { Outlet } from "react-router-dom";
import "./admin.css";

export default function AdminLayout() {
  return (
    <>
      <Navigation />
      <div id="layoutSidenav">
        <SideContent />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
