import React, { useState } from "react";

export default function EmailNotification() {
  const [isChecked, setIsCheked] = useState(true);

  return (
    <div className="email-varification card border-0 shadow-sm rounded-4 h-100" style={{ background: "white" }}>
      <div className="p-4" style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        borderBottom: "1px solid #e2e8f0"
      }}>
        <div className="d-flex align-items-center mb-3">
          <div className="me-3">
            <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white"
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          </div>
          <div>
            <h4 className="fw-bold mb-1" style={{ color: "#1e293b" }}>Email Notifications</h4>
            <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
              Manage your email notification preferences
            </p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h5 className="fw-semibold mb-3" style={{ color: "#1e293b" }}>Notification Settings</h5>
        <p className="text-secondary mb-4" style={{ fontSize: "0.9rem" }}>
          These settings apply to the notifications you receive via email.
        </p>

      <div className="checks">
        <div className="check d-flex align-items-center justify-content-between p-3 rounded-3" style={{ background: "#f8fafc" }}>
          <div>
            <h6 className="fw-semibold mb-1" style={{ color: "#1e293b" }}>Allow email notifications</h6>
            <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.8rem" }}>
              Receive important updates and reminders via email
            </p>
          </div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={isChecked}
              onChange={() => setIsCheked(!isChecked)}
              style={{
                width: "3rem",
                height: "1.5rem",
                backgroundColor: isChecked ? "#10b981" : "#d1d5db"
              }}
            />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
