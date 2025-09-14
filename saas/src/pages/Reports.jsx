import React, { useEffect } from "react";
import Publish from "../components/cards/Publish";
import ReportsItem from "../components/cards/ReportsItem";
import NoReports from "../components/NoReports";
import { useDispatch, useSelector } from "react-redux";
import { safeMap } from "../utils/safeArray";
import { getReports } from "../store/reports/reportHandler";

export default function Reports() {
  const { role } = useSelector((state) => state.user);
  const { reports, loading } = useSelector((state) => state.reports);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReports());
  }, []);

  return (
    <div 
      className="reports-page"
      style={{
        padding: "2rem 0"
      }}
    >
      <div className="container">
        {/* Page Header */}
        {/* <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div>
                <h1 
                  className="fw-bold mb-1"
                  style={{ 
                    color: "#374151", 
                    fontSize: "32px",
                    marginBottom: "0.5rem"
                  }}
                >
                  Reports & Insights
                </h1>
                <p 
                  className="text-muted mb-0"
                  style={{ fontSize: "16px" }}
                >
                  {role === "teacher" 
                    ? "Share insights and track student progress" 
                    : "Stay updated with teacher feedback and announcements"
                  }
                </p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Publish Component for Teachers */}
        {role === "teacher" && (
          <div className="row mb-5">
            <div className="col-12">
              <Publish />
            </div>
          </div>
        )}

        {/* Reports Section */}
        <div className="row">
          <div className="col-12">
            <div 
              className="reports-section p-md-4"
            >
              {/* Section Header */}
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h3 
                    className="fw-bold mb-1"
                    style={{ 
                      color: "#374151", 
                      fontSize: "24px"
                    }}
                  >
                    Recent Reports
                  </h3>
                  <p 
                    className="text-muted mb-0"
                    style={{ fontSize: "14px" }}
                  >
                    {role === "teacher" 
                      ? "Your published reports and announcements" 
                      : "Latest updates from your teachers"
                    }
                  </p>
                </div>
                
                {/* Reports count badge */}
                {reports && reports.length > 0 && (
                  <div 
                    className="badge"
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px"
                    }}
                  >
                    {reports.length} report{reports.length !== 1 ? 's' : ''}
                  </div>
                )}
              </div>

              {/* Reports Content */}
              <div className="reports-content">
                {loading ? (
                  <div 
                    className="d-flex justify-content-center align-items-center py-5"
                    style={{ minHeight: "200px" }}
                  >
                    <div className="text-center">
                      <div 
                        className="spinner-border text-primary mb-3"
                        style={{ width: "3rem", height: "3rem" }}
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p 
                        className="text-muted mb-0"
                        style={{ fontSize: "14px" }}
                      >
                        Loading reports...
                      </p>
                    </div>
                  </div>
                ) : reports && reports.length > 0 ? (
                  <div className="reports-list">
                    {safeMap(reports, (report) => (
                      <ReportsItem key={report._id} report={report} />
                    ))}
                  </div>
                ) : (
                  <NoReports />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
