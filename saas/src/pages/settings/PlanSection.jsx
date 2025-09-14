import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getPlanDetails,
  basePrices,
} from "../../data/plans";

export default function PlanSection() {
  const { user , role} = useSelector((state) => state.user);

  const currentPlan = user?.plan || "free";
  const planDetails = getPlanDetails(currentPlan);
  const paymentData = user?.paymentData;

  const getPlanColor = (plan) => {
    switch (plan) {
      case "premium":
        return "#FF6B35"; // Orange
      case "standard":
        return "#10B981"; // Green
      default:
        return "#6366f1"; // Indigo
    }
  };

  const getPlanIcon = (plan) => {
    switch (plan) {
      case "premium":
        return "⭐";
      case "standard":
        return "🚀";
      default:
        return "🎯";
    }
  };

  const getPlanDescription = (plan) => {
    switch (plan) {
      case "premium":
        return "Unlimited features for professional educators";
      case "standard":
        return "Great for growing classes and advanced features";
      default:
        return "Perfect for getting started with attendance tracking";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };


  if(role === 'student') return null ;
  return (
    <div className="plan-section">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        <div
          style={{
            background: `linear-gradient(135deg, ${getPlanColor(
              currentPlan
            )}, ${getPlanColor(currentPlan)}dd)`,
            padding: "20px",
            color: "white",
            position: "relative",
          }}
        >
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="me-4">
                <div style={{ fontSize: "48px" }}>
                  {getPlanIcon(currentPlan)}
                </div>
              </div>
              <div>
                <h3 className="fw-bold mb-2" style={{ fontSize: "2rem" }}>
                  {planDetails.name} Plan
                </h3>
                <p className="mb-0 opacity-90" style={{ fontSize: "1.1rem" }}>
                  {getPlanDescription(currentPlan)}
                </p>
              </div>
            </div>
            <div className="text-end">
              <div className="mb-2">
                <span className="fw-bold" style={{ fontSize: "2.5rem" }}>
                  {currentPlan === "free"
                    ? "Free"
                    : `${basePrices[currentPlan]} DA`}
                </span>
                <span className="opacity-90 ms-1">/month</span>
              </div>
              <div
                className="badge px-3 py-2"
                style={{
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Current Plan
              </div>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Plan Status and Dates */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            <div className="flex-grow-1">
              <div className="p-3 rounded-3" style={{ background: "#f8fafc" }}>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                    >
                      <path d="M9 12l2 2 4-4"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <span className="fw-semibold" style={{ color: "#10b981" }}>
                    Plan Status
                  </span>
                </div>
                <p
                  className="mb-0"
                  style={{ color: "#6b7280", fontSize: "0.9rem" }}
                >
                  {paymentData?.paymentStatus === "paid"
                    ? "Active"
                    : "Inactive"}{" "}
                  • {paymentData ? "Paid Plan" : "Free Plan"}
                </p>
              </div>
            </div>

            {paymentData && (
              <>
                <div className="flex-grow-1">
                  <div
                    className="p-3 rounded-3"
                    style={{ background: "#f8fafc" }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#6366f1"
                          strokeWidth="2"
                        >
                          <path d="M6 3v7a6 6 0 006 6 6 6 0 006-6V3"></path>
                          <path d="M4 21h16"></path>
                        </svg>
                      </div>
                      <span
                        className="fw-semibold"
                        style={{ color: "#6366f1" }}
                      >
                        Start Date
                      </span>
                    </div>
                    <p
                      className="mb-0"
                      style={{ color: "#6b7280", fontSize: "0.9rem" }}
                    >
                      {formatDate(paymentData.planStartDate)}
                    </p>
                  </div>
                </div>

                <div className="flex-grow-1">
                  <div
                    className="p-3 rounded-3"
                    style={{ background: "#f8fafc" }}
                  >
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="2"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                        </svg>
                      </div>
                      <span
                        className="fw-semibold"
                        style={{ color: "#f59e0b" }}
                      >
                        End Date
                      </span>
                    </div>
                    <p
                      className="mb-0"
                      style={{ color: "#6b7280", fontSize: "0.9rem" }}
                    >
                      {formatDate(paymentData.planEndDate)}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Upgrade Section */}
          {currentPlan !== "premium" && (
            <div
              className="upgrade-section p-4 rounded-4"
              style={{
                background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                border: "1px solid #0ea5e9",
              }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="flex-grow-1">
                  <h5 className="fw-bold mb-2" style={{ color: "#0c4a6e" }}>
                    {currentPlan === "free"
                      ? "Upgrade to Standard"
                      : "Upgrade to Premium"}
                  </h5>
                  <p
                    className="mb-0"
                    style={{ color: "#0369a1", fontSize: "0.9rem" }}
                  >
                    {currentPlan === "free"
                      ? "Get access to advanced features like reports, email notifications, and more classes."
                      : "Unlock unlimited classes, students, and premium features like messaging and advanced reminders."}
                  </p>
                </div>
                <div className="text-end">
                  <Link to="/pricing">
                    <button
                      className="btn fw-bold px-4 py-2"
                      style={{
                        background:
                          "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-1px)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 12px rgba(14, 165, 233, 0.3)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      View Plans & Upgrade
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
