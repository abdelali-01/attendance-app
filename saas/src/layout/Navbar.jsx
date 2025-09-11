import React, { useState } from "react";
import logo from "../components/icons/logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./layout.css";

export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  return (
    <nav className={`amazing-navbar${open ? " open" : ""}`}> 
      <div className="navbar-inner container">
        <div className="navbar-brand">
          <Link to="/">
            <img src={logo} alt="Attendance App Logo" />
          </Link>
        </div>
        <div className={`navbar-links${open ? " show" : ""}`}>
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/pricing" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            About Us
          </Link>
          {/* CTA buttons for mobile, only visible when menu is open */}
          <div className="navbar-cta navbar-cta-mobile">
            {user ? (
              <Link to={"/dashboard"} onClick={() => setOpen(false)}>
                <button className="amazing-btn" >Dashboard</button>
              </Link>
            ) : (
              <>
                <Link to={"/signup"} onClick={() => setOpen(false)}>
                  <button className="amazing-btn-outline">Start For Free</button>
                </Link>
                <Link to={"/login"} onClick={() => setOpen(false)}>
                  <button className="amazing-btn">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
        {/* CTA buttons for desktop, hidden on mobile */}
        <div className="navbar-cta navbar-cta-desktop">
          {user ? (
            <Link to={"/dashboard"}>
              <button className="amazing-btn">Dashboard</button>
            </Link>
          ) : (
            <>
              <Link to={"/signup"}>
                <button className="amazing-btn-outline">Start For Free</button>
              </Link>
              <Link to={"/login"}>
                <button className="amazing-btn">Login</button>
              </Link>
            </>
          )}
        </div>
        <button className="navbar-burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>
      </div>
    </nav>
  );
}
