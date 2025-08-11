import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../../components/Loader";
import { useSelector } from "react-redux";

export default function UpdateProfile() {
  const serverUri = import.meta.env.VITE_BASE_URI;
  const { role, user, loading } = useSelector((state) => state.user);
  
  // manage the form display with state
  const [isVisible, setIsVisible] = useState(false);

  // manage the inputs value
  const [form, setForm] = useState({
    name: "",
    familyName: "",
    password: "",
    confPass: "",
    matricule: "",
  });

  const changeForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user && !loading) {
      setForm({
        name: user.name,
        familyName: user.familyName,
        password: "",
        confPass: "",
        matricule: role === "student" ? user.matricule : "",
      });
    }
  }, [user, role]);

  // update function
  const update = async (e) => {
    e.preventDefault();

    // Remove password from form if it's empty before sending the data
    if (!form.password) {
      const { password, ...formWithoutPassword } = form;
      setForm(formWithoutPassword); // Remove password if it's empty
    }

    try {
      await axios.put(
        `${serverUri}/auth/update/${user._id}?role=${role}`,
        form
      );
      window.location.reload();
    } catch (error) {
      console.error("error during updating the account", error);
      alert("faild to update your account , please try again !");
    }
  };

  return (
    <div
      className="update-profile card border-0 shadow-sm rounded-4 h-100"
      style={{
        overflow: "hidden",
        background: "white"
      }}
    >
      {loading || !user ? (
        <Loader />
      ) : (
        <>
          <div className="top-card p-4" style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
            borderBottom: "1px solid #e2e8f0"
          }}>
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: "48px",
                    height: "48px",
                    background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                    color: "white"
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <div>
                  <h4 className="fw-bold mb-1" style={{ color: "#1e293b", fontSize: "1.25rem" }}>Profile Settings</h4>
                  <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.9rem" }}>
                    Manage and update your profile details
                  </p>
                </div>
              </div>
              <button
                className="btn btn-outline-secondary rounded-circle"
                onClick={() => setIsVisible(!isVisible)}
                style={{
                  width: "44px",
                  height: "44px",
                  padding: "0",
                  transition: "all 0.3s ease",
                  border: "2px solid #d1d5db"
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  style={{
                    transform: isVisible ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease"
                  }}
                >
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </button>
            </div>
            
            {/* User Info Card */}
            <div className="user-info-card p-3 rounded-3" style={{
              background: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(99, 102, 241, 0.1)"
            }}>
              <div className="d-flex align-items-center">
                <div className="me-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-1" style={{ 
                    textTransform: "capitalize", 
                    color: "#1e293b",
                    fontWeight: "600",
                    fontSize: "1rem"
                  }}>
                    {user.familyName} {user.name}
                  </h6>
                  <p className="mb-0" style={{ color: "#6b7280", fontSize: "0.85rem" }}>
                    {user.email}
                  </p>
                </div>
                <div className="ms-2">
                  <span className="badge px-2 py-1" style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "white",
                    fontSize: "0.7rem",
                    fontWeight: "500"
                  }}>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          <form
            className={`${
              isVisible ? "visible-form" : "hidden-form"
            } position-relative p-4`}
            onSubmit={update}
          >
            {loading ? (
              <Loader h={"200px"} />
            ) : (
              <>
                {/* Form Header */}
                <div className="mb-4">
                  <h5 className="fw-bold mb-3" style={{ color: "#1e293b" }}>
                    Personal Information
                  </h5>
                  <p className="text-secondary mb-0" style={{ fontSize: "0.9rem" }}>
                    Update your personal details and account information
                  </p>
                </div>

                {/* Name Fields */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="name" className="form-label fw-semibold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        First Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={changeForm}
                        className="form-control"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="familyName" className="form-label fw-semibold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="familyName"
                        name="familyName"
                        value={form.familyName}
                        onChange={changeForm}
                        className="form-control"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Fields */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="password" className="form-label fw-semibold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <circle cx="12" cy="16" r="1"></circle>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        New Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={changeForm}
                        className="form-control"
                        placeholder="Leave blank to keep current password"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="field">
                      <label htmlFor="conf-pass" className="form-label fw-semibold">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <circle cx="12" cy="16" r="1"></circle>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="conf-pass"
                        name="confPass"
                        value={form.confPass}
                        onChange={changeForm}
                        className="form-control"
                        placeholder="Confirm your new password"
                      />
                    </div>
                  </div>
                </div>

                {/* Student-specific field */}
                {role === "student" && (
                  <div className="row g-3 mb-4">
                    <div className="col-md-6">
                      <div className="field">
                        <label htmlFor="matricule" className="form-label fw-semibold">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                          </svg>
                          Matricule
                        </label>
                        <input
                          type="text"
                          id="matricule"
                          name="matricule"
                          value={form.matricule}
                          minLength={"12"}
                          maxLength={"12"}
                          onChange={changeForm}
                          className="form-control"
                          placeholder="Enter your matricule number"
                          required={role === "student"}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="d-flex justify-content-end mt-4 pt-3" style={{ borderTop: "1px solid #e2e8f0" }}>
                  <button 
                    type="submit" 
                    className="btn fw-bold px-4 py-2"
                    style={{
                      background: "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-1px)";
                      e.target.style.boxShadow = "0 4px 12px rgba(99, 102, 241, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "none";
                      e.target.style.boxShadow = "none";
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                      <polyline points="17,21 17,13 7,13 7,21"></polyline>
                      <polyline points="7,3 7,8 15,8"></polyline>
                    </svg>
                    Update Profile
                  </button>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </div>
  );
}
