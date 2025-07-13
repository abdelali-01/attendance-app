import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { verifyEmail } from "../store/auth/authHandler";

export default function Verification() {
  const { token } = useParams();
  const [status, setStatus] = useState(token ? "loading" : "no-token"); // loading, success, error, no-token
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!token) return;
    const fetch = async () => {
      const result = await verifyEmail(token);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.message);
      }
    };
    fetch();
  }, [token]);

  // Icon SVGs for envelope, check, and cross
  const EnvelopeIcon = (
    <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#6366f1", filter: "drop-shadow(0 2px 8px #6366f133)", transition: 'all 0.4s' }}>
      <rect width="24" height="24" rx="12" fill="#EEF2FF" />
      <path d="M6 8.5A2.5 2.5 0 0 1 8.5 6h7A2.5 2.5 0 0 1 18 8.5v7A2.5 2.5 0 0 1 15.5 18h-7A2.5 2.5 0 0 1 6 15.5v-7Z" stroke="#6366f1" strokeWidth="1.5"/>
      <path d="M7.5 8.75 12 12.25l4.5-3.5" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const CheckIcon = (
    <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#22c55e", filter: "drop-shadow(0 2px 8px #22c55e33)", transition: 'all 0.4s' }}>
      <rect width="24" height="24" rx="12" fill="#DCFCE7" />
      <path d="M8 12.5l3 3 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  const CrossIcon = (
    <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "#ef4444", filter: "drop-shadow(0 2px 8px #ef444433)", transition: 'all 0.4s' }}>
      <rect width="24" height="24" rx="12" fill="#FEE2E2" />
      <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Gradient button style
  const gradientBtn = {
    background: "linear-gradient(90deg, #6366f1 0%, #7c3aed 100%)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 18,
    padding: "0.85rem 0",
    marginTop: 24,
    width: "100%",
    boxShadow: "0 4px 16px #6366f133",
    transition: "all 0.2s",
    letterSpacing: 0.5,
    cursor: "pointer"
  };

  // Card fade-in animation
  const cardAnim = {
    animation: "fadeInCard 0.7s cubic-bezier(.4,0,.2,1)",
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 8px 32px rgba(99,102,241,0.10)",
    maxWidth: 420,
    width: "100%",
    padding: "2.5rem 2rem 2rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

  // Page background
  const bgStyle = {
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  // Keyframes for fade-in (inject into page)
  if (typeof window !== "undefined" && !document.getElementById("fadeInCardKeyframes")) {
    const style = document.createElement("style");
    style.id = "fadeInCardKeyframes";
    style.innerHTML = `@keyframes fadeInCard { from { opacity: 0; transform: translateY(40px) scale(0.98); } to { opacity: 1; transform: none; } }`;
    document.head.appendChild(style);
  }

  return (
    <div style={bgStyle} className="mt-5">
      <div style={cardAnim}>
        {status === "no-token" && (
          <>
            <div className="mb-4">{EnvelopeIcon}</div>
            <h2 className="fw-bold text-center mb-2" style={{ color: "#6366f1", fontSize: 28 }}>Check your Email</h2>
            <div className="text-center text-secondary mb-3" style={{ fontSize: 17, fontWeight: 500 }}>
              A verification link has been sent to your email.<br />
              Please check your inbox to verify your account.
            </div>
          </>
        )}
        {status === "loading" && (
          <>
            <div className="mb-4">
              <div className="spinner-border text-primary" style={{ width: 48, height: 48 }} role="status">
                <span className="visually-hidden">Verifying...</span>
              </div>
            </div>
            <h2 className="fw-bold text-center mb-2" style={{ color: "#6366f1", fontSize: 28 }}>Verifying your email...</h2>
          </>
        )}
        {status === "success" && (
          <>
            <div className="mb-4">{CheckIcon}</div>
            <h2 className="fw-bold text-center mb-2" style={{ color: "#22c55e", fontSize: 28 }}>Email Verified!</h2>
            <div className="text-center text-success mb-3" style={{ fontSize: 17, fontWeight: 500 }}>
              Your email has been successfully verified.<br />You can now log in.
            </div>
          </>
        )}
        {status === "error" && (
          <>
            <div className="mb-4">{CrossIcon}</div>
            <h2 className="fw-bold text-center mb-2" style={{ color: "#ef4444", fontSize: 28 }}>Verification Failed</h2>
            <div className="text-center text-danger mb-3" style={{ fontSize: 17, fontWeight: 500 }}>
              {errorMsg}
            </div>
          </>
        )}
        <Link to={"/login"} className="w-100" style={{ textDecoration: "none" }}>
          <button
            className="btn"
            style={gradientBtn}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 8px 32px #6366f155"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "0 4px 16px #6366f133"}
          >
            Back to Login Page
          </button>
        </Link>
      </div>
    </div>
  );
}
