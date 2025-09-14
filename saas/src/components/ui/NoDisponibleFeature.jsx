import React from "react";

export default function NoDisponibleFeature() {
  return (
    <div
      className="d-flex align-items-center justify-content-center h-100"
      style={{
        padding: "2rem"
      }}
    >
      <div 
        className="no-feature-container d-flex flex-column align-items-center text-center"
      >
        {/* Icon Container */}
        <div 
          className="feature-icon-container mb-3"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "32px",
            fontWeight: "600",
            boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
          }}
        >
          🔧
        </div>

        {/* Content */}
        <div className="feature-content">
          <h2 
            className="fw-bold mb-3"
            style={{ 
              color: "#374151", 
              fontSize: "24px"
            }}
          >
            Feature Under Development
          </h2>
          
          <p 
            className="text-muted mb-4"
            style={{ 
              fontSize: "15px", 
              lineHeight: "1.5"
            }}
          >
            This feature is currently being developed and will be available soon. 
            Thank you for your patience!
          </p>

          {/* Action Buttons */}
          <div className="d-flex gap-2 justify-content-center flex-wrap">
            <button 
              className="btn px-3 py-2 rounded-3 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 16px rgba(102, 126, 234, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "none";
                e.target.style.boxShadow = "none";
              }}
            >
              <i className="fa-solid fa-home me-2"></i>
              Go Home
            </button>
            
            <button 
              className="btn px-3 py-2 rounded-3 fw-semibold"
              style={{
                background: "transparent",
                color: "#667eea",
                border: "2px solid #667eea",
                fontSize: "14px",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#667eea";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#667eea";
                e.target.style.transform = "none";
              }}
            >
              <i className="fa-solid fa-bell me-2"></i>
              Notify Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
