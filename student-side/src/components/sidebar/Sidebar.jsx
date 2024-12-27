import React, { useEffect, useRef, useState } from "react";
import "./sidebar.css";
import logo from "../icons/logo.svg";
import home_icon from "../icons/Overview.svg";
import students_icon from "../icons/Customers.svg";
import activity_icon from "../icons/Activity.svg";
import report_icon from "../icons/Reports.svg";
import settings_icon from "../icons/Settings.svg";
import logout_icon from "../icons/Logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Sidebar() {
  const student = JSON.parse(localStorage.getItem('Student'))
  const [isDisabled , setIsDisabled] = useState(true) ;

  // check if the class it's open 
  useEffect(()=>{
    const fetchClass = async () => {
      const res = await axios.get(`http://localhost:4620/class/getclass/${student.class}`);
      const posibilityStatus = res.data.posibility ;
      setIsDisabled(!posibilityStatus);
    }
    fetchClass();
  },[student.class]);

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

  return (
    <>
      <i
        class="fa-solid fa-bars text-white position-fixed fs-3"
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
              <span>Home</span>
            </Link>
            <Link
              to={"/class"} // Prevent navigation if disabled
              style={{
                pointerEvents: isDisabled ? "none" : "auto", 
                cursor: isDisabled ? "not-allowed !important" : "pointer", 
                userSelect: "none",
              }}
            >
              <button
                disabled={isDisabled}
                className={`btn btn-default text-white border-0 sidebar-link py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3 ${
                  activeLink === "/class" ? "active" : ""
                }`}
                
              >
                <img src={students_icon} alt="" />
                <span>Class</span>
              </button>
            </Link>
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

            <div
              onClick={() => {
                localStorage.removeItem("Student");
                navigate("/");
              }}
              className="sidebar-link py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3"
            >
              <img src={logout_icon} alt="" />
              <span>Logout</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
