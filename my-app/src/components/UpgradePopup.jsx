import React, { useState, useRef, useEffect } from "react";

const UpgradePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState("standard");
  const popupRef = useRef(null);

  // Function to handle clicks on any "upgrade-trigger" button
  const handleTriggerClick = (event) => {
    if (event.target.classList.contains("upgrade-trigger")) {
      setPopupContent(event.target.getAttribute("data-plan") || "standard");
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !event.target.classList.contains("upgrade-trigger")
      ) {
        setIsOpen(false);
        document.body.style.overflow = "";
      }
    };

    // Listen for clicks globally
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("click", handleTriggerClick);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleTriggerClick);
    };
  }, []);



  const getPlanColor = (plan) => {
    switch (plan) {
      case "premium":
        return "#FF6B35"; // Orange
      case "pro":
        return "#5A57FF"; // Your primary color
      default:
        return "#10B981"; // Green
    }
  };

  return (
    <>
      {/* Popup (Centered) */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            zIndex: "10000",
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            top: "0",
            left: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div
            ref={popupRef}
            className="upgrade-popup"
            style={{
              background: "white",
              borderRadius: "20px",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "hidden",
              animation: "slideIn 0.3s ease-out"
            }}
          >
            {/* Header */}
            <div
              style={{
                background: `linear-gradient(135deg, ${getPlanColor(popupContent)}, ${getPlanColor(popupContent)}dd)`,
                padding: "30px 30px 20px",
                textAlign: "center",
                color: "white",
                position: "relative"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  cursor: "pointer",
                  fontSize: "24px",
                  opacity: "0.8",
                  transition: "opacity 0.2s"
                }}
                onClick={() => {
                  setIsOpen(false);
                  document.body.style.overflow = "";
                }}
                onMouseEnter={(e) => e.target.style.opacity = "1"}
                onMouseLeave={(e) => e.target.style.opacity = "0.8"}
              >
                ✕
              </div>
              
              <div style={{ fontSize: "48px", marginBottom: "10px" }}>
                ⭐
              </div>
              <h3 style={{ 
                margin: "0 0 10px 0", 
                fontSize: "28px", 
                fontWeight: "700",
                fontFamily: "Poppins, sans-serif"
              }}>
                Upgrade to {popupContent.charAt(0).toUpperCase() + popupContent.slice(1)}
              </h3>
              <p style={{ 
                margin: "0", 
                opacity: "0.9", 
                fontSize: "16px",
                fontFamily: "Poppins, sans-serif"
              }}>
                Unlock powerful features for your attendance management
              </p>
            </div>

            {/* Content */}
            <div style={{ padding: "30px" }}>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <button
                  style={{
                    background: `linear-gradient(135deg, ${getPlanColor(popupContent)}, ${getPlanColor(popupContent)}dd)`,
                    color: "white",
                    border: "none",
                    borderRadius: "12px",
                    padding: "16px 24px",
                    fontSize: "18px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "Poppins, sans-serif",
                    boxShadow: `0 4px 15px ${getPlanColor(popupContent)}40`
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = `0 6px 20px ${getPlanColor(popupContent)}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow = `0 4px 15px ${getPlanColor(popupContent)}40`;
                  }}
                >
                  Upgrade Now
                </button>
                <button
                  style={{
                    background: "transparent",
                    color: "#666",
                    border: "2px solid #e5e7eb",
                    borderRadius: "12px",
                    padding: "14px 24px",
                    fontSize: "16px",
                    fontWeight: "500",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "Poppins, sans-serif"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.color = "#333";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "#e5e7eb";
                    e.target.style.color = "#666";
                  }}
                  onClick={() => {
                    setIsOpen(false);
                    document.body.style.overflow = "";
                  }}
                >
                  Maybe Later
                </button>
              </div>

              {/* Footer */}
              <div style={{ 
                textAlign: "center", 
                marginTop: "20px", 
                paddingTop: "20px",
                borderTop: "1px solid #e5e7eb"
              }}>
                <p style={{ 
                  margin: "0", 
                  fontSize: "14px", 
                  color: "#666",
                  fontFamily: "Poppins, sans-serif"
                }}>
                  🔒 Secure payment • Cancel anytime • 30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default UpgradePopup;
