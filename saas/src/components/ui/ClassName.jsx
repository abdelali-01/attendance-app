import React from "react";
import { Link } from "react-router-dom";

export default function ClassName({ classData, classId }) {
  return (
    <div className="class-information w-100 my-2">
      <div
        className="w-100 d-flex justify-content-between align-items-center"
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,.08)",
          border: "1px solid rgba(0,0,0,.05)",
          padding: "1.2rem 1.2rem",
        }}
      >
        <div className="d-flex flex-column">
          <h4 className="fw-bold mb-1" style={{ color: "#111827" }}>
            <span style={{ textTransform: "capitalize", color: "#3730a3" }}>
              {classData.module}
            </span>
            <span className="ms-1" style={{ color: "#6b7280" }}>
              - {classData.class?.toUpperCase()}
            </span>
          </h4>
          <div className="text-muted" style={{ fontSize: 16 }}>
            {classData.speciality || classData.system}
          </div>
        </div>
      <Link
        to={`/classes/${classId}/settings`}
        className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
        style={{ width: 44, height: 44 }}
        title="Class settings"
      >
        <i className="fa-solid fa-gear"></i>
      </Link>
      </div>

    </div>
  );
}
