import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  getPlanDetails, 
  featureAvailability, 
  basePrices,
  calculateSavings
} from '../../../data/plans';

export default function PlanSection() {
  const { user } = useSelector((state) => state.user);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const currentPlan = user?.plan || 'free';
  const planDetails = getPlanDetails(currentPlan);
  
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

  const getFeatureIcon = (isAvailable) => {
    if (isAvailable === true) {
      return (
        <div className="me-2" style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
      );
    } else if (isAvailable === false) {
      return (
        <div className="me-2" style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="me-2" style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </div>
      );
    }
  };

  const getFeatureText = (feature, availability) => {
    if (availability === true) {
      return <span style={{ color: "#1e293b", fontWeight: "500" }}>{feature}</span>;
    } else if (availability === false) {
      return <span style={{ color: "#6b7280" }}>{feature}</span>;
    } else {
      return <span style={{ color: "#374151" }}>{feature}: <span style={{ color: "#6b7280" }}>{availability}</span></span>;
    }
  };

  const allFeatures = [
    "Class Limit",
    "Student Limit", 
    "Statistics",
    "Attendance Tracking",
    "Reports Feature",
    "Email Notifications",
    "Class Attendance Reminders",
    "Messages Feature"
  ];

  return (
    <div className="plan-section">
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
        {/* Header */}
        <div
          style={{
            background: `linear-gradient(135deg, ${getPlanColor(currentPlan)}, ${getPlanColor(currentPlan)}dd)`,
            padding: "30px",
            color: "white",
            position: "relative"
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
                  {currentPlan === 'free' ? 'Free' : `${basePrices[currentPlan]} DA`}
                </span>
                <span className="opacity-90 ms-1">/month</span>
              </div>
              <div className="badge px-3 py-2" style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                fontSize: "0.9rem",
                fontWeight: "600"
              }}>
                Current Plan
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Plan Status */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: "#f8fafc" }}>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                      <path d="M9 12l2 2 4-4"></path>
                      <circle cx="12" cy="12" r="10"></circle>
                    </svg>
                  </div>
                  <span className="fw-semibold" style={{ color: "#10b981" }}>
                    Plan Status
                  </span>
                </div>
                <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                  Active • Renews automatically
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-3 rounded-3" style={{ background: "#f8fafc" }}>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                  <span className="fw-semibold" style={{ color: "#6366f1" }}>
                    Features
                  </span>
                </div>
                <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                  {allFeatures.filter(feature => featureAvailability[currentPlan][feature] === true).length} of {allFeatures.length} features active
                </p>
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-4">
            <h5 className="fw-bold mb-3" style={{ color: "#1e293b" }}>
              Plan Features
            </h5>
            <div className="row">
              {allFeatures.map((feature, index) => (
                <div key={index} className="col-md-6 mb-3">
                  <div className="d-flex align-items-center">
                    {getFeatureIcon(featureAvailability[currentPlan][feature])}
                    {getFeatureText(feature, featureAvailability[currentPlan][feature])}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upgrade Section */}
          {currentPlan !== 'premium' && (
            <div className="upgrade-section p-4 rounded-4" style={{
              background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
              border: "1px solid #0ea5e9"
            }}>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h5 className="fw-bold mb-2" style={{ color: "#0c4a6e" }}>
                    {currentPlan === 'free' ? 'Upgrade to Standard' : 'Upgrade to Premium'}
                  </h5>
                  <p className="mb-0" style={{ color: "#0369a1", fontSize: "0.9rem" }}>
                    {currentPlan === 'free' 
                      ? 'Get access to advanced features like reports, email notifications, and more classes.'
                      : 'Unlock unlimited classes, students, and premium features like messaging and advanced reminders.'
                    }
                  </p>
                </div>
                <div className="col-lg-4 text-end">
                  <Link to={`/subscribe?plan=${currentPlan === 'free' ? 'standard' : 'premium'}`}>
                    <button className="btn fw-bold px-4 py-2" style={{
                      background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={e => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(14, 165, 233, 0.3)";
                    }}
                    onMouseOut={e => {
                      e.currentTarget.style.transform = "none";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                    >
                      {currentPlan === 'free' ? 'Upgrade Now' : 'Upgrade to Premium'}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Plan Comparison */}
          <div className="mt-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>
                Plan Comparison
              </h5>
              <button 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ fontSize: "0.9rem" }}
              >
                {isExpanded ? 'Show Less' : 'Show More'}
              </button>
            </div>
            
            {isExpanded && (
              <div className="row g-3">
                {['free', 'standard', 'premium'].map((plan) => (
                  <div key={plan} className="col-md-4">
                    <div className="card border-0 shadow-sm h-100" style={{
                      border: plan === currentPlan ? `2px solid ${getPlanColor(plan)}` : "1px solid #e5e7eb"
                    }}>
                      <div className="card-header border-0 p-3" style={{
                        background: plan === currentPlan ? `linear-gradient(135deg, ${getPlanColor(plan)}10, ${getPlanColor(plan)}20)` : "#f8fafc"
                      }}>
                        <div className="text-center">
                          <div className="mb-2" style={{ fontSize: "24px" }}>
                            {getPlanIcon(plan)}
                          </div>
                          <h6 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                            {plan.charAt(0).toUpperCase() + plan.slice(1)}
                          </h6>
                          <div className="mb-2">
                            <span className="fw-bold" style={{ color: getPlanColor(plan) }}>
                              {plan === 'free' ? 'Free' : `${basePrices[plan]} DA`}
                            </span>
                            <span className="text-secondary ms-1">/month</span>
                          </div>
                          {plan === currentPlan && (
                            <div className="badge px-2 py-1" style={{
                              background: getPlanColor(plan),
                              color: "white",
                              fontSize: "0.7rem"
                            }}>
                              Current
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="card-body p-3">
                        <ul className="list-unstyled mb-0">
                          {allFeatures.slice(0, 4).map((feature, index) => (
                            <li key={index} className="mb-2">
                              <div className="d-flex align-items-center">
                                {getFeatureIcon(featureAvailability[plan][feature])}
                                <span style={{ 
                                  fontSize: "0.8rem",
                                  color: featureAvailability[plan][feature] === true ? "#1e293b" : "#6b7280"
                                }}>
                                  {feature}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                        {plan !== currentPlan && (
                          <div className="text-center mt-3">
                            <Link to={`/subscribe?plan=${plan}`}>
                              <button className="btn btn-sm w-100" style={{
                                background: plan === 'free' ? "#6b7280" : getPlanColor(plan),
                                color: "white",
                                border: "none",
                                fontSize: "0.8rem"
                              }}>
                                {plan === 'free' ? 'Downgrade' : 'Upgrade'}
                              </button>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 