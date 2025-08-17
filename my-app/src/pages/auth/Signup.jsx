import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast/ToastContainer";
import { useDispatch } from "react-redux";
import { signup } from "../../store/auth/authHandler";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { showSuccess, showError} = useToast();
  // set some hooks to manage the form
  const [user, setUser] = useState({
    name: "",
    familyName: "",
    email: "",
    password: "",
    matricule: null,
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const fetchData = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await dispatch(signup(user, navigate));
      if (response.success) {
        showSuccess(response.message);
      } else {
        showError(response.message);
      }
    } catch (error) {
      console.log("error during the signup", error);
      showError(error.response?.data || "Failed to signup, please try again.");
    } finally {
      setLoading(false); // Stop the loading state after the request is done
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
            🎓
          </div>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "700",
            marginBottom: "20px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)"
          }}>
            Join Our Community
          </h1>
          <p style={{
            fontSize: "20px",
            opacity: 0.9,
            lineHeight: "1.6",
            marginBottom: "30px",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)"
          }}>
            Create your account and start managing attendance like a pro
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
              <div style={{ fontSize: "24px" }}>⚡</div>
              <span style={{ fontSize: "16px" }}>Quick and easy setup</span>
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
              <div style={{ fontSize: "24px" }}>🔐</div>
              <span style={{ fontSize: "16px" }}>Secure and reliable</span>
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
              <div style={{ fontSize: "24px" }}>📱</div>
              <span style={{ fontSize: "16px" }}>Works on all devices</span>
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
              Create Account
            </h2>
            <p style={{
              fontSize: "16px",
              color: "#6b7280",
              margin: 0
            }}>
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={fetchData} style={{ width: "100%" }}>
            <div className="field-row">
              <div className="field">
                <label htmlFor="name">First Name</label>
          <input
            value={user.name}
            onChange={handleChange}
            name="name"
            id="name"
            type="text"
                  placeholder="Enter first name"
            required
          />
        </div>
              <div className="field">
                <label htmlFor="familyName">Last Name</label>
          <input
            value={user.familyName}
            onChange={handleChange}
            name="familyName"
            id="familyName"
            type="text"
                  placeholder="Enter last name"
            required
          />
        </div>
            </div>

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
                placeholder="Create a password"
            required
          />
        </div>

            <div className="field">
              <label htmlFor="role">Select Your Role</label>
          <select
            name="role"
            id="role"
            required
            value={user.role}
            onChange={handleChange}
          >
                <option value="" disabled>Choose your role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
          </select>
        </div>

            {user.role === "student" && (
              <div className="field">
                <label htmlFor="matricule">Matricule Number</label>
          <input
            value={user.matricule}
            onChange={handleChange}
            id="matricule"
            name="matricule"
            type="number"
            placeholder="Enter your matricule"
                  minLength="12"
                  maxLength="12"
            required={user.role === "student"}
          />
        </div>
            )}

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
                  Creating account...
                </div>
              ) : (
                "Create Account"
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
                Already have an account?{" "}
                <Link to="/login" style={{
                  color: "var(--primary)",
                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "color 0.3s ease"
                }}
                onMouseEnter={(e) => e.target.style.color = "#4f46e5"}
                onMouseLeave={(e) => e.target.style.color = "var(--primary)"}
                >
                  Sign in here
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
