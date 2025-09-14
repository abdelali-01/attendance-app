import React from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { deleteReport } from "../../store/reports/reportHandler";

export default function ReportsItem({ report }) {
  const { user, role } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const result = await dispatch(deleteReport(report._id));
    if (result.success) {
      // Report will be automatically removed from state by the handler
    }
  };

  const isOwnReport = role === "teacher" && user && report.teacherId === user._id;

  return (
    <div 
      className="report-item"
      style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        padding: "1.5rem",
        marginBottom: "1.5rem",
        transition: "all 0.3s ease",
        border: "1px solid rgba(0, 0, 0, 0.05)",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
      }}
    >
      {/* Header with timestamp and actions */}
      <div 
        className="d-flex justify-content-between align-items-start mb-3"
        style={{ minHeight: "32px" }}
      >
        <div className="d-flex align-items-center gap-2">
          {/* Report icon */}
          <div 
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "18px",
              fontWeight: "600"
            }}
          >
            📊
          </div>
          
          {/* Author info - Fixed logic */}
          {isOwnReport ? (
            // Teacher viewing their own report
            <div>
              <h6 
                className="mb-0 fw-bold" 
                style={{ 
                  color: "#374151",
                  fontSize: "16px"
                }}
              >
                My Report
              </h6>
              <p 
                className="mb-0 text-muted" 
                style={{ fontSize: "14px" }}
              >
                Shared with {report.classes?.length || 0} class{report.classes?.length !== 1 ? 'es' : ''}
              </p>
            </div>
          ) : (
            // Student viewing teacher's report OR teacher viewing another teacher's report
            <div>
              <h6 
                className="mb-0 fw-bold" 
                style={{ 
                  textTransform: "capitalize",
                  color: "#374151",
                  fontSize: "16px"
                }}
              >
                {report.familyName} {report.name}
              </h6>
              <p 
                className="mb-0 text-muted" 
                style={{ fontSize: "14px" }}
              >
                {report.email}
              </p>
            </div>
          )}
        </div>

        {/* Right side - timestamp and actions */}
        <div className="d-flex align-items-center gap-3">
          <span 
            className="text-muted"
            style={{ 
              fontSize: "13px",
              fontWeight: "500"
            }}
          >
            {moment(report.createdAt).fromNow()}
          </span>
          
          {/* Delete button for own reports (teachers only) */}
          {isOwnReport && (
            <button
              onClick={handleDelete}
              className="btn btn-sm"
              style={{
                background: "transparent",
                border: "none",
                color: "#ef4444",
                padding: "4px 8px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                fontSize: "14px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#fef2f2";
                e.currentTarget.style.color = "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#ef4444";
              }}
              title="Delete this report"
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
      </div>

      {/* Report content */}
      <div 
        className="report-content"
        style={{
          background: "#f8fafc",
          borderRadius: "12px",
          padding: "1rem",
          border: "1px solid #e2e8f0",
          marginTop: "0.5rem"
        }}
      >
        <p 
          className="mb-0"
          style={{ 
            whiteSpace: "pre-wrap", 
            fontFamily: "inherit",
            lineHeight: "1.6",
            color: "#374151",
            fontSize: "15px"
          }}
        >
          {report.report}
        </p>
      </div>

      {/* Footer with additional info for teachers viewing their own reports */}
      {isOwnReport && (
        <div 
          className="mt-3 pt-3"
          style={{ 
            borderTop: "1px solid #e2e8f0",
            fontSize: "13px",
            color: "#6b7280"
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <i className="fa-solid fa-clock" style={{ fontSize: "12px" }}></i>
            <span>Created {moment(report.createdAt).format("MMM DD, YYYY at h:mm A")}</span>
          </div>
        </div>
      )}
    </div>
  );
}
