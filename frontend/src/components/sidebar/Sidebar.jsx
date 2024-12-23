import React, { useEffect, useState } from "react";
import "./sidebar.css";
import logo from "../icons/logo.svg";
import home_icon from "../icons/Overview.svg";
import students_icon from "../icons/Customers.svg";
import arrow_icon from "../icons/Downarrow.svg";
import activity_icon from "../icons/Activity.svg";
import report_icon from "../icons/Reports.svg";
import settings_icon from "../icons/Settings.svg";
import logout_icon from "../icons/Logout.svg";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ classes }) {
  // create state -useState- to manage the arrow_icon
  const [arrow, setArrow] = useState(false);
  // create state to manage the active link
  const [activeLink, setActiveLink] = useState(window.location.pathname);

  // Using useLocation hook to update active link based on URL
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

    // Check if the current path matches any class
    const isActiveDropdown = classes.some((c) => location.pathname.includes(c.class));

  return (
    <div className="sidebar py-4 text-white d-flex flex-column sticky-top">
      <div className="sidebar-logo-app d-flex align-items-center gap-3 justify-content-center">
        <img src={logo} alt="" />
        <span className="fw-bold fs-5">Circle</span>
      </div>
      <div className="sidebar-actions d-flex flex-column justify-content-between align-items-start mb-5">
        <div className="sidebar-links d-flex flex-column align-items-start gap-1 my-5 w-100">
          <Link
            to="/"
            className={`sidebar-link ${
              activeLink === "/" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
          >
            <img src={home_icon} alt="" />
            <span>Dashboard</span>
          </Link>

          <div className="dropdown w-100 d-flex flex-column align-items-end">
            <div
              className={`sidebar-link ${
                isActiveDropdown  ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              onClick={() => setArrow(!arrow)}
              id="dropdownMenuButton"
              data-bs-toggle="collapse"
              data-bs-target="#studentsDropdown"
              aria-expanded="false"
              aria-controls="studentsDropdown"
              role="button"
            >
              <img src={students_icon} alt="" />
              <span>Students</span>
              <img
                className={`arrow-icon ${arrow ? "rotate" : ""}`}
                src={arrow_icon}
                alt=""
              />
            </div>
            <div className="collapse me-5" id="studentsDropdown">
              <ul className="list-unstyled">
                {classes.map((c) => (
                  <Link to={`/${c.class}`} key={c.class}>
                    <li>{c.class}</li>
                  </Link>
                ))}
                <li>Add new class</li>
              </ul>
            </div>
          </div>

          <Link
            to="/activity"
            className={`sidebar-link ${
              activeLink === "/activity" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
          >
            <img src={activity_icon} alt="" />
            <span>Activities</span>
          </Link>

          <Link
            to="/reports"
            className={`sidebar-link ${
              activeLink === "/reports" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
          >
            <img src={report_icon} alt="" />
            <span>Reports</span>
          </Link>
        </div>

        <div className="sidebar-profile-actions w-100 d-flex flex-column align-items-start gap-4">
          <Link
            to="/settings"
            className={`sidebar-link ${
              activeLink === "/settings" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
          >
            <img src={settings_icon} alt="" />
            <span>Settings</span>
          </Link>

          <div className="sidebar-link py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3">
            <img src={logout_icon} alt="" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
