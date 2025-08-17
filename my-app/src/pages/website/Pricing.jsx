import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  allFeatures, 
  featureAvailability,
  calculateSavings
} from '../../data/plans';

export default function Pricing() {
  const { user } = useSelector((state) => state.user);
  const currentUserPlan = user?.plan || 'free';

  const plans = [
    {
      name: "Free",
      price: "0 DA",
      period: "forever",
      description: "Perfect for getting started",
      buttonText: "Get Started",
      buttonStyle: "secondary",
      popular: false
    },
    {
      name: "Standard",
      price: "320 DA",
      period: "per month",
      description: "Great for growing classes",
      buttonText: "Get Started",
      buttonStyle: "primary",
      popular: true,
      originalPrice: "800 DA",
      savings: calculateSavings('standard', 1) + " DA"
    },
    {
      name: "Premium",
      price: "396 DA",
      period: "per month",
      description: "For professional educators",
      buttonText: "Get Started",
      buttonStyle: "premium",
      popular: false,
      originalPrice: "990 DA",
      savings: calculateSavings('premium', 1) + " DA"
    }
  ];

  const getButtonStyle = (style) => {
    switch (style) {
      case "primary":
        return {
          background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)"
        };
      case "premium":
        return {
          background: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
          color: "white",
          border: "none",
          boxShadow: "0 4px 16px rgba(139, 92, 246, 0.3)"
        };
      default:
        return {
          background: "white",
          color: "#6366f1",
          border: "2px solid #6366f1",
          boxShadow: "none"
        };
    }
  };

  const getCurrentPlanBadge = (planName) => {
    if (user && planName.toLowerCase() === currentUserPlan) {
      return (
        <div className="position-absolute top-0 end-0 m-3">
          <span className="badge px-3 py-2" style={{
            background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
            color: "white",
            fontSize: "0.875rem",
            fontWeight: "600",
            borderRadius: "20px"
          }}>
            Current Plan
          </span>
        </div>
      );
    }
    return null;
  };

  const getFeatureIcon = (isAvailable) => {
    if (isAvailable === true) {
      return (
        <div className="me-3" style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
        </div>
      );
    } else if (isAvailable === false) {
      return (
        <div className="me-3" style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      );
    } else {
      // For limit features (string values)
      return (
        <div className="me-3" style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        </div>
      );
    }
  };

  const getFeatureText = (feature, isAvailable) => {
    if (typeof isAvailable === 'string') {
      return (
        <span style={{ 
          color: "#374151",
          fontSize: "0.95rem"
        }}>
          {feature}: <strong>{isAvailable}</strong>
        </span>
      );
    } else if (isAvailable === true) {
      return (
        <span style={{ 
          color: "#374151",
          fontSize: "0.95rem"
        }}>
          {feature}
        </span>
      );
    } else {
      return (
        <span style={{ 
          color: "#9ca3af",
          fontSize: "0.95rem",
          textDecoration: "line-through"
        }}>
          {feature}
        </span>
      );
    }
  };

  const getPlanButton = (plan) => {
    if (!user) {
      // Not logged in - show signup/login buttons
      return (
        <Link to={`/subscribe?plan=${plan.name.toLowerCase()}`} style={{ textDecoration: "none" }}>
          <button 
            className="btn fw-bold px-4 py-3 w-100" 
            style={{
              ...getButtonStyle(plan.buttonStyle),
              borderRadius: "12px",
              fontSize: "1rem",
              transition: "all 0.2s ease"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = getButtonStyle(plan.buttonStyle).boxShadow;
            }}
          >
            {plan.name === "Free" ? "Get Started" : "Subscribe Now"}
          </button>
        </Link>
      );
    }

    // User is logged in
    if (plan.name.toLowerCase() === currentUserPlan) {
      // Current plan - show dashboard button
      return (
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <button 
            className="btn fw-bold px-4 py-3 w-100" 
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 16px rgba(16, 185, 129, 0.3)"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.4)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(16, 185, 129, 0.3)";
            }}
          >
            Go to Dashboard
          </button>
        </Link>
      );
    } else if (plan.name.toLowerCase() === 'free' && currentUserPlan !== 'free') {
      // Downgrading to free - show warning
      return (
        <button 
          className="btn fw-bold px-4 py-3 w-100" 
          style={{
            background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            transition: "all 0.2s ease",
            boxShadow: "0 4px 16px rgba(239, 68, 68, 0.3)"
          }}
          disabled
        >
          Contact Support
        </button>
      );
    } else {
      // Upgrading or different plan - show subscribe button
      return (
        <Link to={`/subscribe?plan=${plan.name}`} style={{ textDecoration: "none" }}>
          <button 
            className="btn fw-bold px-4 py-3 w-100" 
            style={{
              ...getButtonStyle(plan.buttonStyle),
              borderRadius: "12px",
              fontSize: "1rem",
              transition: "all 0.2s ease"
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = getButtonStyle(plan.buttonStyle).boxShadow;
            }}
          >
            {currentUserPlan === 'free' ? 'Upgrade Now' : 'Change Plan'}
          </button>
        </Link>
      );
    }
  };

  return (
    <div className="pricing-page" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
      padding: "4rem 0"
    }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold mb-3" style={{ 
            fontSize: "3rem", 
            color: "#1e293b",
            letterSpacing: "-0.025em"
          }}>
            Choose Your Plan
          </h1>
          <p className="fs-5 text-secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
            Start with our free plan and upgrade as your needs grow. All plans include our core attendance tracking features.
          </p>
          
          {/* User Status Section */}
            {/* {user && (
              <div className="mt-4 p-3 rounded-3" style={{
                background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                border: "1px solid #0ea5e9",
                maxWidth: "500px",
                margin: "0 auto"
              }}>
                <div className="d-flex align-items-center justify-content-center">
                  <div className="me-3">
                    <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                      width: "40px",
                      height: "40px",
                      background: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)",
                      color: "white"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  </div>
                  <div className="text-start">
                    <div className="fw-semibold" style={{ color: "#0c4a6e" }}>
                      Welcome back, {user.name}!
                    </div>
                    <div className="text-secondary" style={{ fontSize: "0.9rem" }}>
                      Current Plan: <span className="fw-semibold text-capitalize" style={{ color: "#0ea5e9" }}>
                        {currentUserPlan}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
        </div>

        {/* Pricing Cards */}
        <div className="row justify-content-center g-4" style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {plans.map((plan, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="position-relative h-100">
                {plan.popular && (
                  <div className="position-absolute top-0 start-50 translate-middle-x" style={{ zIndex: 10 }}>
                    <span className="badge px-3 py-2" style={{
                      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: "600",
                      borderRadius: "20px"
                    }}>
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="card h-100 border-0 shadow-lg" style={{
                  borderRadius: "20px",
                  background: "white",
                  transition: "all 0.3s ease",
                  transform: plan.popular ? "scale(1.05)" : "scale(1)",
                  border: plan.popular ? "2px solid #6366f1" : "none",
                  position: "relative"
                }}
                onMouseOver={e => {
                  e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
                }}
                onMouseOut={e => {
                  e.currentTarget.style.transform = plan.popular ? "scale(1.05)" : "scale(1)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
                }}>
                  {getCurrentPlanBadge(plan.name)}
                  <div className="card-body p-4">
                    {/* Plan Header */}
                    <div className="text-center mb-4">
                      <h3 className="fw-bold mb-2" style={{ color: "#1e293b", fontSize: "1.5rem" }}>
                        {plan.name}
                      </h3>
                      <div className="mb-2">
                        <span className="fw-bold" style={{ fontSize: "2.5rem", color: "#6366f1" }}>
                          {plan.price}
                        </span>
                        <span className="text-secondary ms-1">/{plan.period}</span>
                        
                      </div>
                      <p className="text-secondary mb-0">{plan.description}</p>
                    </div>

                    {/* Features List */}
                    <div className="mb-4">
                      <ul className="list-unstyled">
                        {allFeatures.map((feature, featureIndex) => (
                          <li key={featureIndex} className="d-flex align-items-center mb-3">
                            {getFeatureIcon(featureAvailability[plan.name.toLowerCase()][feature])}
                            {getFeatureText(feature, featureAvailability[plan.name.toLowerCase()][feature])}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                      {getPlanButton(plan)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center mt-5 pt-5">
          <h4 className="fw-bold mb-4" style={{ color: "#1e293b" }}>
            Questions? We're here to help
          </h4>
          <p className="text-secondary mb-0">
            Contact our support team for any questions about our pricing plans.
          </p>
        </div>
      </div>
    </div>
  );
}
