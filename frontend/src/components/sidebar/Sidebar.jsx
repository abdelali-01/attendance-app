import React, { useState } from "react";
import "./sidebar.css";
import logo from "../icons/logo.svg";
import home_icon from "../icons/Overview.svg";
import students_icon from "../icons/Customers.svg";
import arrow_icon from "../icons/Downarrow.svg";
import activity_icon from "../icons/Activity.svg";
import report_icon from "../icons/Reports.svg";
import settings_icon from "../icons/Settings.svg";
import logout_icon from "../icons/Logout.svg";
import { Link} from "react-router-dom";


export default function Sidebar({classes}) {
  // create state -useState- to manage the arrow_icon
  const [arrow, setArrow] = useState(false);
  // create state to manage the active link
  const [activeLink, setActiveLink] = useState("dashboard");

  return (
    <div className="sidebar py-4 text-white d-flex flex-column sticky-top">
      <div className="sidebar-logo-app d-flex align-items-center gap-3 justify-content-center">
        <img src={logo} alt="" />
        <span className="fw-bold fs-5">Circle</span>
      </div>
      <div className="sidebar-actions d-flex flex-column justify-content-between align-items-start mb-5">
        <div className="sidebar-links d-flex flex-column align-items-start gap-1 my-5 w-100">
          <div
            className={`sidebar-link ${
              activeLink === "dashboard" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            onClick={() => {
              setActiveLink("dashboard");
            }}
          >
            <img src={home_icon} alt="" />
            <span>Dashboar</span>
          </div>
          <div className="dropdown w-100 d-flex flex-column align-items-end">
            <div
              className={`sidebar-link ${
                activeLink === "students" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              onClick={() => {
                setActiveLink("students");
                setArrow(arrow ? false : true);
              }}
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
              <ul className="list-unstyled ">
                {classes.map((c) => {
                  return <Link to={`/${c.class}`}><li>{c.class}</li></Link>;
                })}
                <li>Add new class</li>
              </ul>
            </div>
          </div>
          <div
            className={`sidebar-link ${
              activeLink === "activity" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            onClick={() => {
              setActiveLink("activity");
            }}
          >
            <img src={activity_icon} alt="" />
            <span>Activities</span>
          </div>
          <div
            className={`sidebar-link ${
              activeLink === "reports" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            onClick={() => {
              setActiveLink("reports");
            }}
          >
            <img src={report_icon} alt="" />
            <span>Reports</span>
          </div>
        </div>
        <div className="sidebar-profile-actions w-100 d-flex flex-column align-items-start gap-4">
          <div
            className={`sidebar-link ${
              activeLink === "settings" ? "active" : ""
            } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            onClick={() => {
              setActiveLink("settings");
            }}
          >
            <img src={settings_icon} alt="" />
            <span>Settings</span>
          </div>
          <div className="sidebar-link py-2 ps-5 w-100 py-2 d-flex align-items-center justify-constartenter gap-3 ">
            <img src={logout_icon} alt="" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}
