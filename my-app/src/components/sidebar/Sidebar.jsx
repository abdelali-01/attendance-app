import React, { useEffect, useRef, useState } from "react";
import "./sidebar.css";
import logo from "../icons/logo.svg";
import home_icon from "../icons/Overview.svg";
import students_icon from "../icons/Customers.svg";
import arrow_icon from "../icons/Downarrow.svg";
import report_icon from "../icons/Reports.svg";
import message_icon from "../icons/Message.svg";
import settings_icon from "../icons/Settings.svg";
import logout_icon from "../icons/Logout.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authHandler";
import { safeMap, safeSome } from "../../utils/safeArray";

export default function Sidebar() {
  const { role, user } = useSelector((state) => state.user);
  const { classes } = useSelector((state) => state.classes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // create state -useState- to manage the arrow_icon
  const [arrow, setArrow] = useState(false);
  // create state to manage the active link
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  // Using useLocation hook to update active link based on URL
  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

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
  const isActiveDropdown =
    classes && safeSome(classes, (c) => location.pathname.includes(c._id));

    
  return (
    <>
      <i
        className="fa-solid fa-bars text-white position-absolute fs-3"
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
            className="fa-regular fa-circle-xmark position-absolute fs-4"
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
              to="/dashboard"
              className={`sidebar-link ${
                activeLink === "/dashboard" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            >
              <img src={home_icon} alt="" />
              <span>{role === "student" ? "Home" : "Dashboard"}</span>
            </Link>

            {role === "teacher" ? (
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
                    {safeMap(classes, (c) => (
                        <Link
                          onClick={hendleLink}
                          to={`/dashboard/classes/${c._id}`}
                          key={c._id}
                        >
                          <li style={{ textTransform: "capitalize" }}>
                            {c.class}
                          </li>
                        </Link>
                      ))}
                    <Link to={"/dashboard/add-class"} onClick={hendleLink}>
                      <li>Add new class</li>
                    </Link>
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                onClick={hendleLink}
                to="/dashboard/classes"
                className={`sidebar-link ${
                  activeLink.startsWith("/dashboard/classes") ? "active" : ""
                } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              >
                <img src={students_icon} alt="" />
                <span>Classes</span>
              </Link>
            )}

            <Link
              onClick={user.plan !== "free" && hendleLink}
              to={user.plan !== "free" && "/dashboard/reports"}
              className={`sidebar-link upgrade-trigger ${
                activeLink === "/dashboard/reports" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              style={{
                opacity: user.plan === "free" && ".6",
                cursor: user.plan === "free" && "not-allowed",
              }}
            >
              <img src={report_icon} alt="" />
              <span>Reports</span>
              <i className="fa-solid fa-crown"></i>
            </Link>

            <Link
              onClick={user.plan !== "free" && hendleLink}
              to={user.plan !== "free" && "/dashboard/messages"}
              className={`sidebar-link upgrade-trigger ${
                activeLink === "/dashboard/messages" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              style={{
                opacity: user.plan === "free" && ".6",
                cursor: user.plan === "free" && "not-allowed",
              }}
            >
              <img src={message_icon} alt="" />
              <span>Messages</span>
              <i className="fa-solid fa-crown"></i>
            </Link>
          </div>

          <div className="sidebar-profile-actions w-100 d-flex flex-column align-items-start gap-4">
            <Link
              onClick={hendleLink}
              to="/dashboard/settings"
              className={`sidebar-link ${
                activeLink === "/dashboard/settings" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
            >
              <img src={settings_icon} alt="" />
              <span>Settings</span>
            </Link>

            <div
              onClick={() => {
                dispatch(logout(navigate));
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