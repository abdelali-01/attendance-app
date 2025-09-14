import React, { useState } from "react";
import ClassItem from "../components/cards/ClassItem";
import Popup from "../components/modals/Popup";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { safeMap } from "../utils/safeArray";
import NoClassAvailable from "../components/NoClassAvailable";
import NoClassJoined from "../components/NoClassJoined";

export default function Classes() {
  const { classes } = useSelector((state) => state.classes);
  const { role } = useSelector((state) => state.user);
  const loading = false;

  // manage the join class popup display with state
  const [isVisible, setIsVisible] = useState(false);

  // Plus icon SVG
  const PlusIcon = (
    <svg
      width="36"
      height="36"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      style={{ color: "#6366f1" }}
    >
      <rect width="24" height="24" rx="12" fill="#EEF2FF" />
      <path
        d="M12 8v8M8 12h8"
        stroke="#6366f1"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  // Card dimensions (responsive)
  const cardStyle = {
    flex: "1",
    minWidth: 220,
    display: "flex",
    alignItems: "stretch",
    margin: 0,
    padding: 0,
  };

  // Add Class Card for teachers
  const addClassCard = (
    <Link
      to="/add-class"
      style={{
        textDecoration: "none",
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 4px 24px #6366f122",
          height: "100%",
          width: "100%",
          padding: "12px",
          cursor: "pointer",
          transition: "box-shadow 0.2s, transform 0.2s",
          border: "2px dashed #6366f1",
          color: "#6366f1",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 32px #6366f144";
          e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.boxShadow = "0 4px 24px #6366f122";
          e.currentTarget.style.transform = "none";
        }}
      >
        <div className="mb-2">{PlusIcon}</div>
        <div className="fw-bold" style={{ fontSize: 18 }}>
          Add New Class
        </div>
        <div className="text-secondary" style={{ fontSize: 14 }}>
          Create a new class
        </div>
      </div>
    </Link>
  );

  // Modern floating join button for students
  const joinBtnStyle = {
    position: "fixed",
    right: 32,
    bottom: 32,
    zIndex: 100,
    background: "linear-gradient(90deg, #6366f1 0%, #7c3aed 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 32,
    fontWeight: 700,
    fontSize: 18,
    padding: "0.85rem 2.2rem",
    boxShadow: "0 8px 32px #6366f144",
    transition: "all 0.2s",
    letterSpacing: 0.5,
    cursor: "pointer",
  };

  // Responsive grid style
  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
  };

  return (
    <div
      className="classes-page flex-grow-1 px-3 px-md-5 m-auto"
      style={{
        paddingTop: 32,
        paddingBottom: 32,
      }}
    >
      <div className="container py-4">
        {loading ? (
          <>Loading ... </>
        ) : classes && classes.length < 1 ?
          role === 'teacher' ? <NoClassAvailable /> : <NoClassJoined/>
         : (
          <>
            {/* Page Title */}
            <h2
              className="fw-bold mb-5"
              style={{ color: "#3730a3", fontSize: 32, letterSpacing: 0.5 }}
            >
              My Classes
            </h2>
            <div className="row g-4" style={gridStyle}>
              {safeMap(classes, (classe) => (
                <div key={classe._id} style={cardStyle}>
                  <Link
                    to={`/classes/${classe._id}`}
                    style={{
                      textDecoration: "none",
                      width: "100%",
                      height: "100%",
                      display: "block",
                    }}
                  >
                    <ClassItem classe={classe} showMenu={role === "student"} />
                  </Link>
                </div>
              ))}
              {role === "teacher" && (
                <div style={cardStyle}>{addClassCard}</div>
              )}
            </div>
          </>
        )}

        {/* Floating Join Class Button for students */}
        {role === "student" && (
          <div className="join-class">
            <button
              className="btn"
              style={joinBtnStyle}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow = "0 16px 48px #6366f188")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow = "0 8px 32px #6366f144")
              }
              onClick={() => setIsVisible(true)}
            >
              Join class
            </button>
            <Popup
              display={isVisible}
              closePopup={() => {
                setIsVisible(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
