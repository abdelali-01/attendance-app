import React, { useEffect, useRef, useState } from "react";
import logo from "../components/icons/logo.svg";
import home_icon from "../components/icons/Overview.svg";
import students_icon from "../components/icons/Customers.svg";
import report_icon from "../components/icons/Reports.svg";
import message_icon from "../components/icons/Message.svg";
import settings_icon from "../components/icons/Settings.svg";
import logout_icon from "../components/icons/Logout.svg";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth/authHandler";
import { useSidebar } from "../contexts/SidebarContext";
import "./layout.css";

export default function Sidebar() {
  const { role, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { sidebarOpen, setSidebarOpen } = useSidebar();

  // create state to manage the active link
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const location = useLocation();
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const sidebarRef = useRef(null);

  // Responsive: detect if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1200;

  // Use a consistent desktop width to prevent visual shrinking across pages
  const desktopSidebarWidth = 290;

  // Close sidebar on interaction (click or scroll)
  useEffect(() => {
    const handleInteraction = (e) => {
      // If click is on the menu button, do not close sidebar
      let el = e.target;
      while (el) {
        if (el.getAttribute && el.getAttribute("data-menu-button") === "true") {
          return;
        }
        el = el.parentElement;
      }
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        isMobile
      ) {
        setSidebarOpen(false);
      }
    };
    const handleScroll = () => {
      if(isMobile) setSidebarOpen(false);
    };
    window.addEventListener("mousedown", handleInteraction);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousedown", handleInteraction);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setSidebarOpen , isMobile]);

  // close sidebar when we click any link in
  const hendleLink = () => {
    if(isMobile) setSidebarOpen(false);
  };

  // Sidebar style for all screens
  const sidebarStyle = {
    position: isMobile ? "fixed" : sidebarOpen ? "sticky" :"fixed" ,
    left: sidebarOpen ? 0 : (isMobile ? "-80vw" : `-${desktopSidebarWidth}px`),
    top: isMobile ? 64 : 0,
    height: isMobile ? "calc(100vh - 64px)" : "100vh",
    width: desktopSidebarWidth,
    maxWidth: desktopSidebarWidth,
    minWidth: desktopSidebarWidth,
    flex: isMobile ? undefined : `0 0 ${desktopSidebarWidth}px`,
    boxSizing: "border-box",
    zIndex: 1200,
    background: "#6366f1",
    overflowY: "auto",
    transition: "0.3s cubic-bezier(.4,0,.2,1)",
    boxShadow: sidebarOpen ? "0 8px 32px #6366f188" : "none",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: isMobile ? 12 : 0,
    borderBottomRightRadius: isMobile ? 12 : 0,
  };

  return (
    <>
      <div
        ref={sidebarRef}
        className={`sidebar py-4 text-white d-flex flex-column ${isMobile ? "" : "sticky-top top-0"} ${sidebarOpen ? "" : "closed-side"}`}
        style={sidebarStyle}
      >
        {/* Removed the X (close) icon. Sidebar is only toggled from Navbar. */}
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
              <span>{role === "student" ? "Home" : "Dashboard"}</span>
            </Link>

              {role === 'teacher' && <Link
                onClick={hendleLink}
                to="/classes"
                className={`sidebar-link ${
                  activeLink.startsWith("/classes") ? "active" : ""
                } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              >
                <img src={students_icon} alt="" />
                <span>Students</span>
              </Link>}

            <Link
              onClick={user.plan !== "free" && hendleLink}
              to={user.plan !== "free" && "/reports"}
              className={`sidebar-link ${user.plan === "free" && "upgrade-trigger"} ${
                activeLink === "/reports" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              style={{
                opacity: user.plan === "free" && ".6",
                cursor: user.plan === "free" && "not-allowed",
              }}
            >
              <img src={report_icon} alt="" />
              <span>Reports</span>
              {role === 'teacher' && <i className="fa-solid fa-crown"></i>}
            </Link>

            <Link
              onClick={user.plan !== "free" && hendleLink}
              to={user.plan !== "free" && "/messages"}
              className={`sidebar-link ${user.plan === "free" && "upgrade-trigger"} ${
                activeLink === "/messages" ? "active" : ""
              } py-2 ps-5 w-100 d-flex align-items-center justify-content-start gap-3`}
              style={{
                opacity: user.plan === "free" && ".6",
                cursor: user.plan === "free" && "not-allowed",
              }}
            >
              <img src={message_icon} alt="" />
              <span>Messages</span>
              {role === 'teacher' && <i className="fa-solid fa-crown"></i>}
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
                dispatch(logout());
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