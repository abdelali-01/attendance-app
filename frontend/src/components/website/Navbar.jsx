import React from "react";
import logo from "../icons/logo.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((state) => state.user);
  return (
    <div style={{ background: "var(--gray)" }}>
      <div className="navbar container gap-5">
        <div className="navbar-brand">
          <img src={logo} alt="" />
        </div>
        <div className="navbar-links d-flex align-items-center justify-content-between flex-grow-1">
          <div className="navbar-navigators d-flex align-items-center gap-4">
            <Link to={"#"}>
              <span>Home</span>
            </Link>
            <Link to={"#"}>
              <span>Pricing</span>
            </Link>
            <Link to={"#"}>
              <span>About Us</span>
            </Link>
          </div>
          <div className="navbar-cta d-flex gap-2">
            {user ? (
              <Link to={'/dashboard'}>
                <div className="open-style rounded-4 p-1">
                    <span className="py-3 px-2">Dashboard</span>
                    <i className="fa-solid fa-angle-up bg-white text-dark rounded-4 p-1" style={{rotate : "90deg"}}></i>
                </div>
              </Link>
            ) : (
              <>
                <Link to={"/signup"}>
                  <button className="btn open-style-outline">
                    Start For Free
                  </button>
                </Link>
                <Link to={"/login"}>
                  <button className="btn open-style">Login</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
