import React from "react";
import { useSidebar } from "../../contexts/SidebarContext";

export default function Navbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <nav
      style={{
        width: "100%",
        height: 64,
        background: "#fff",
        boxShadow: "0 2px 12px rgba(99,102,241,0.07)",
        display: "flex",
        alignItems: "center",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        transition: "margin-left 0.3s cubic-bezier(.4,0,.2,1)",
      }}
    >
      <button
        onClick={toggleSidebar}
        data-menu-button="true"
        style={{
          background: "none",
          border: "none",
          outline: "none",
          cursor: "pointer",
          marginRight: 24,
          display: "flex",
          alignItems: "center",
        }}
        aria-label="Open sidebar menu"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
      {/* You can add a dashboard title or user info here if desired */}
    </nav>
  );
} 