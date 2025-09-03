import React from 'react'

export default function AppUnderDevelopmentAlert() {
  return (
    <div style={{
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1000,
      background: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
      color: "white",
      padding: "20px 30px",
      borderRadius: "15px",
      boxShadow: "0 10px 40px rgba(255, 107, 107, 0.3)",
      textAlign: "center",
      maxWidth: "400px",
      border: "2px solid rgba(255, 255, 255, 0.2)"
    }}>
      <div style={{ fontSize: "24px", marginBottom: "8px" }}>🚧</div>
      <div style={{ 
        fontWeight: "bold", 
        fontSize: "16px", 
        marginBottom: "5px" 
      }}>
        App Under Development
      </div>
      <div style={{ 
        fontSize: "14px", 
        opacity: 0.9 
      }}>
        This application is currently being developed and is not fully functional yet.
      </div>
    </div>
  )
} 