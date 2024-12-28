import React, { useEffect, useRef, useState } from "react";
import "./sidebar.css";
import logo from "../icons/logo.svg";
import home_icon from "../icons/Overview.svg";
import students_icon from "../icons/Customers.svg";
import arrow_icon from "../icons/Downarrow.svg";
import activity_icon from "../icons/Activity.svg";
import report_icon from "../icons/Reports.svg";
import settings_icon from "../icons/Settings.svg";
import logout_icon from "../icons/Logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";

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

  // call useNavigate hook to manage the admin position when he logout 
  const navigate = useNavigate();

  //create hooks for the responsive
  const [sidebarStatus, setSidebarStatus] = useState(window.innerWidth > 1200);
  const sidebarRef = useRef(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setSidebarStatus(window.innerWidth > 1200);
    });
  });

  // Close sidebar on interaction (click or scroll)
  useEffect(() => {
    const handleInteraction = (e) => {
      if (
        window.innerWidth < 1200 &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target)
      ) {
        setSidebarStatus(false);
      }
    };

    const handleScroll = () => {
      if (window.innerWidth < 1200) {
        setSidebarStatus(false);
      }
    };

    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("scroll", handleScroll);
  }, []);
  
  // close sidebar when we click any link in
  const hendleLink = () => {
    if (window.innerWidth < 1200) {
      setSidebarStatus(false);
    }
  };

  // Check if the current path matches any class
  const isActiveDropdown = classes.some((c) =>
    location.pathname.includes(c.class)
  );

  return (
    <>
      <i
        class="fa-solid fa-bars text-white position-absolute fs-3"
        onClick={() => setSidebarStatus(true)}
      ></i>
      <div
        ref={sidebarRef}
        className={`sidebar py-4 text-white d-flex flex-column sticky-top  ${
          sidebarStatus ? "" : "closed-side"
        }`}
      >
        {sidebarStatus && window.innerWidth < 1200 ? (
          <i
            role="button"
            class="fa-regular fa-circle-xmark position-absolute fs-4"
            onClick={() => setSidebarStatus(false)}
            style={{
              top: "5px",
              right: "5px",
            }}
          ></i>
        ) : (
          <></>
        )}
        <div className="sidebar-logo-app d-flex align-items-center gap-3 justify-content-center">
          <img src={logo} alt="" />
          <span className="fw-bold fs-5">Circle</span>
        </div>
        <div className="sidebar-actions d-flex flex-column justify-content-between align-items-start mb-3">
          <div className="sidebar-links d-flex flex-column align-items-start gap-1 my-5 w-100">
            <Link
              onClick={hendleLink}
              to="/"
              className={`sidebar-link ${
                activeLink === "/" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            >
              <img src={home_icon} alt="" />
              <span>Dashboard</span>
            </Link>

            <div className="dropdown w-100 d-flex flex-column align-items-center">
              <div
                className={`sidebar-link ${
                  isActiveDropdown ? "active" : ""
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
              <div className="collapse ms-3" id="studentsDropdown">
                <ul className="list-unstyled">
                  {classes.map((c) => (
                    <Link onClick={hendleLink} to={`/${c.class}`} key={c._id}>
                      <li>{c.class}</li>
                    </Link>
                  ))}
                  <Link to={"/add-class"} onClick={hendleLink}><li>Add new class</li></Link>
                </ul>
              </div>
            </div>

            <Link
              onClick={hendleLink}
              to="/activity"
              className={`sidebar-link ${
                activeLink === "/activity" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            >
              <img src={activity_icon} alt="" />
              <span>Activities</span>
            </Link>

            <Link
              onClick={hendleLink}
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
              onClick={hendleLink}
              to="/settings"
              className={`sidebar-link ${
                activeLink === "/settings" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            >
              <img src={settings_icon} alt="" />
              <span>Settings</span>
            </Link>

            <div onClick={()=>{
              localStorage.removeItem('admin');
              navigate("/")
            }} className="sidebar-link py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3">
              <img src={logout_icon} alt="" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
