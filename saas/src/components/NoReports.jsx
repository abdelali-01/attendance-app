import React from "react";

export default function NoReports() {
  return (
    <div 
      className="no-reports-container d-flex flex-column align-items-center justify-content-center py-5"
      style={{
        minHeight: "400px",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
        borderRadius: "16px",
        border: "2px dashed #cbd5e1",
        margin: "2rem 0"
      }}
    >
      {/* Icon */}
      <div 
        className="no-reports-icon mb-4"
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
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)"
        }}
      >
        📊
      </div>
      
      {/* Content */}
      <div className="text-center" style={{ maxWidth: "400px" }}>
        <h3 
          className="fw-bold mb-3"
          style={{ 
            color: "#374151", 
            fontSize: "24px",
            marginBottom: "1rem"
          }}
        >
          No Reports Yet
        </h3>
        
        <p 
          className="text-muted mb-4"
          style={{ 
            fontSize: "16px", 
            lineHeight: "1.6",
            marginBottom: "1.5rem"
          }}
        >
          There are no reports available at the moment. Check back later for updates and insights from your teachers.
        </p>
        
        {/* Decorative elements */}
        <div className="d-flex justify-content-center gap-2">
          <div 
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#667eea",
              opacity: 0.6
            }}
          ></div>
          <div 
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#764ba2",
              opacity: 0.6
            }}
          ></div>
          <div 
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#667eea",
              opacity: 0.6
            }}
          ></div>
        </div>
      </div>
    </div>
  );
} 