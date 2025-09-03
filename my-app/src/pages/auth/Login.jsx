import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authHandler";
import { useToast } from "../../components/Toast/ToastContainer";
import { hasPendingSubscription, getPendingSubscriptionInfo } from "../../utils/subscriptionUtils";
import AppUnderDevelopmentAlert from "../../components/ui/AppUnderDevelopmentAlert";

export default function Login() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  
  // set some hooks to manage the form
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [pendingSubscription, setPendingSubscription] = useState(null);
  const dispatch = useDispatch();

  // Check for pending subscription on component mount
  useEffect(() => {
    if (hasPendingSubscription()) {
      const pendingInfo = getPendingSubscriptionInfo();
      setPendingSubscription(pendingInfo);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  // fetching
  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await dispatch(login(user, navigate));
      if (response) {
        if (response.success) {
          showSuccess(response.message);
        } else {
          showError(response.message);
        }
      }
    } catch {
      showError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false; // Prevent any form submission
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <div className="auth-container" style={{ 
      minHeight: "100vh", 
      display: "flex", 
      fontFamily: "Poppins, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
      <AppUnderDevelopmentAlert />
      {/* Pending Subscription Notification */}
      {pendingSubscription && (
        <div style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(255, 255, 255, 0.95)",
          padding: "15px 25px",
          borderRadius: "12px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.2)",
          maxWidth: "500px",
          textAlign: "center"
        }}>
          <div style={{ fontSize: "14px", color: "#6366f1", fontWeight: "600", marginBottom: "5px" }}>
            📦 Pending Subscription
          </div>
          <div style={{ fontSize: "12px", color: "#666" }}>
            {pendingSubscription.plan} plan • {pendingSubscription.duration} months • {pendingSubscription.amount} DA
          </div>
          <div style={{ fontSize: "11px", color: "#888", marginTop: "5px" }}>
            Complete your login to proceed with payment
          </div>
        </div>
      )}
      {/* Left Side - Visual */}
      <div className="auth-visual" style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Background Pattern */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"25\" cy=\"25\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"75\" cy=\"75\" r=\"1\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"50\" cy=\"10\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"10\" cy=\"60\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/><circle cx=\"90\" cy=\"40\" r=\"0.5\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg>')",
          opacity: 0.3
        }} />
        
        {/* Content */}
        <div style={{ 
          textAlign: "center", 
          zIndex: 1, 
          position: "relative",
          maxWidth: "500px"
        }}>
          <div style={{
            fontSize: "80px",
            marginBottom: "20px",
            filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
          }}>
            📚
          </div>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "20px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}>
            Welcome Back
          </h1>
          <p style={{
            fontSize: "20px",
            opacity: 0.9,
            lineHeight: "1.6",
            marginBottom: "30px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}>
            Sign in to your account and continue managing your classes with ease
          </p>
          
          {/* Feature highlights */}
          <div className="feature-highlights" style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "40px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px 20px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "24px" }}>✅</div>
              <span style={{ fontSize: "16px" }}>Track attendance effortlessly</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px 20px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "24px" }}>📊</div>
              <span style={{ fontSize: "16px" }}>Generate detailed reports</span>
            </div>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px 20px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(10px)"
            }}>
              <div style={{ fontSize: "24px" }}>🚀</div>
              <span style={{ fontSize: "16px" }}>Manage multiple classes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="auth-form" style={{
        flex: "1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        background: "white"
      }}>
        <div className="auth-form-content" style={{
          width: "100%",
          maxWidth: "400px"
        }}>
          <div style={{
            textAlign: "center",
            marginBottom: "40px"
          }}>
            <h2 style={{
              fontSize: "32px",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "10px"
            }}>
              Sign In
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#6b7280",
              margin: 0
            }}>
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="field">
              <label htmlFor="email">Email Address</label>
          <input
            value={user.email}
            onChange={handleChange}
            name="email"
            id="email"
            type="email"
                placeholder="Enter your email"
            required
            disabled={true}
          />
        </div>

            <div className="field">
          <label htmlFor="password">Password</label>
          <input
            value={user.password}
            onChange={handleChange}
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
            disabled={true}
          />
        </div>

            <div style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px"
            }}>
              <Link to="/reset-pass" style={{
                color: "var(--primary)",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                transition: "color 0.3s ease"
              }}
              onMouseEnter={(e) => e.target.style.color = "#4f46e5"}
              onMouseLeave={(e) => e.target.style.color = "var(--primary)"}
              >
                Forgot your password?
        </Link>
            </div>

            <button
              type="button" // Changed from "submit" to "button"
              className="auth-button"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                padding: "12px 24px",
                border: "none",
                borderRadius: "8px",
                cursor: "not-allowed",
                opacity: 0.6,
                fontSize: "16px",
                fontWeight: "600",
                width: "100%",
                marginTop: "20px"
              }}
              disabled={true}
              onClick={handleButtonClick}
            >
              Sign In
            </button>

            <div style={{
              textAlign: "center",
              marginTop: "24px",
              padding: "20px",
              background: "#f9fafb",
              borderRadius: "8px"
            }}>
              <p style={{
                margin: 0,
                fontSize: "14px",
                color: "#6b7280"
              }}>
                Don't have an account?{" "}
                <Link to="/signup" style={{
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#4f46e5"}
                onMouseLeave={(e) => e.target.style.color = "var(--primary)"}
                >
                  Create one now
                </Link>
              </p>
            </div>
      </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
