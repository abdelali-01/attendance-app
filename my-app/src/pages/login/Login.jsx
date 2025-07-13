import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../store/auth/authHandler";
import { useToast } from "../../components/Toast/ToastContainer";

export default function Login() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  
  // set some hooks to manage the form
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

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

  return (
    <div className="auth-container" style={{ 
      minHeight: "100vh", 
      display: "flex", 
      fontFamily: "Poppins, sans-serif",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    }}>
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

          <form onSubmit={fetchData} style={{ width: "100%" }}>
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
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px 24px",
                background: "linear-gradient(135deg, var(--primary), #4f46e5)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                opacity: loading ? 0.7 : 1,
                boxShadow: "0 4px 12px rgba(90, 87, 255, 0.3)"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 20px rgba(90, 87, 255, 0.4)";
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(90, 87, 255, 0.3)";
                }
              }}
            >
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <div style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid transparent",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
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
