import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  getPendingSubscription, 
  clearPendingSubscription,
  processPendingSubscription
} from '../../utils/subscriptionUtils';

export default function CheckoutRedirecter() {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingSubscription, setPendingSubscription] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Check for pending subscription when user logs in
  useEffect(() => {
    if (user) {
      const pending = getPendingSubscription();
      if (pending) {
        setPendingSubscription(pending);
        setIsOpen(true);
        document.body.style.overflow = "hidden";
      }
    }
  }, [user]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleCloseModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      await processPendingSubscription(
        (processedData) => {
          // Success callback
          console.log('Subscription processed successfully:', processedData);
          setPendingSubscription(null);
          handleCloseModal();
          navigate('/dashboard');
        },
        (error) => {
          // Error callback
          console.error('Error processing subscription:', error);
          // You could show a toast notification here
        }
      );
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    clearPendingSubscription();
    setPendingSubscription(null);
    handleCloseModal();
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case "premium":
        return "#FF6B35"; // Orange
      case "standard":
        return "#10B981"; // Green
      default:
        return "#6366f1"; // Indigo
    }
  };

  const formatCurrency = (amount) => {
    return `${amount.toLocaleString()} DA`;
  };

  const formatDuration = (duration) => {
    return duration === 1 ? '1 Month' : `${duration} Months`;
  };

  if (!isOpen || !pendingSubscription) return null;

  return (
    <>
              {/* Modal Overlay */}
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
            padding: "20px",
            boxSizing: "border-box"
          }}
        >
        {/* Modal Content */}
        <div
          ref={modalRef}
          style={{
            background: "white",
            borderRadius: "20px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
            maxWidth: "500px",
            width: "100%",
            maxHeight: "90vh",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            animation: "slideIn 0.3s ease-out"
          }}
        >
          {/* Header */}
          <div
            style={{
              background: `linear-gradient(135deg, ${getPlanColor(pendingSubscription.plan)}, ${getPlanColor(pendingSubscription.plan)}dd)`,
              padding: "30px 30px 20px",
              textAlign: "center",
              color: "white",
              position: "relative",
              flexShrink: 0
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
              onClick={handleCloseModal}
              onMouseEnter={(e) => e.target.style.opacity = "1"}
              onMouseLeave={(e) => e.target.style.opacity = "0.8"}
            >
              ✕
            </div>
            
            <div style={{ fontSize: "48px", marginBottom: "10px" }}>
              🛒
            </div>
            <h3 style={{ 
              margin: "0 0 10px 0", 
              fontSize: "28px", 
              fontWeight: "700",
              fontFamily: "Poppins, sans-serif"
            }}>
              Complete Your Subscription
            </h3>
            <p style={{ 
              margin: "0", 
              opacity: "0.9", 
              fontSize: "16px",
              fontFamily: "Poppins, sans-serif"
            }}>
              You have a pending subscription ready to checkout
            </p>
          </div>

          {/* Content */}
          <div style={{ 
            padding: "30px", 
            flex: 1, 
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            minHeight: 0
          }}>
            {/* Subscription Details */}
            <div style={{ 
              background: "#f8fafc", 
              borderRadius: "12px", 
              padding: "20px",
              marginBottom: "25px",
              flexShrink: 0
            }}>
              <h4 style={{ 
                margin: "0 0 15px 0", 
                fontSize: "18px", 
                fontWeight: "600",
                color: "#1e293b",
                fontFamily: "Poppins, sans-serif"
              }}>
                Subscription Summary
              </h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>Plan:</span>
                  <span style={{ fontWeight: "600", color: "#1e293b", textTransform: "capitalize" }}>
                    {pendingSubscription.plan}
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>Duration:</span>
                  <span style={{ fontWeight: "600", color: "#1e293b" }}>
                    {formatDuration(pendingSubscription.duration)}
                  </span>
                </div>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>Monthly Price:</span>
                  <span style={{ fontWeight: "600", color: "#1e293b" }}>
                    {formatCurrency(pendingSubscription.monthlyPrice)}
                  </span>
                </div>
                
                {pendingSubscription.savedAmount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#64748b", fontSize: "14px" }}>You Save:</span>
                    <span style={{ fontWeight: "600", color: "#10b981" }}>
                      {formatCurrency(pendingSubscription.savedAmount)}
                    </span>
                  </div>
                )}
                
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  paddingTop: "12px",
                  borderTop: "1px solid #e2e8f0",
                  marginTop: "8px"
                }}>
                  <span style={{ color: "#1e293b", fontSize: "16px", fontWeight: "600" }}>Total:</span>
                  <span style={{ 
                    fontWeight: "700", 
                    color: getPlanColor(pendingSubscription.plan),
                    fontSize: "18px"
                  }}>
                    {formatCurrency(pendingSubscription.amount)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "12px",
              flexShrink: 0,
              marginTop: "auto"
            }}>
              <button
                disabled={isProcessing}
                style={{
                  background: `linear-gradient(135deg, ${getPlanColor(pendingSubscription.plan)}, ${getPlanColor(pendingSubscription.plan)}dd)`,
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 24px",
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "Poppins, sans-serif",
                  boxShadow: `0 4px 15px ${getPlanColor(pendingSubscription.plan)}40`,
                  opacity: isProcessing ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow = `0 6px 20px ${getPlanColor(pendingSubscription.plan)}60`;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = `0 4px 15px ${getPlanColor(pendingSubscription.plan)}40`;
                }}
                onClick={handleCheckout}
              >
                {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              
              <button
                disabled={isProcessing}
                style={{
                  background: "transparent",
                  color: "#666",
                  border: "2px solid #e5e7eb",
                  borderRadius: "12px",
                  padding: "14px 24px",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  fontFamily: "Poppins, sans-serif",
                  opacity: isProcessing ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.target.style.borderColor = "#d1d5db";
                    e.target.style.color = "#333";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#e5e7eb";
                  e.target.style.color = "#666";
                }}
                onClick={handleCancel}
              >
                Cancel Subscription
              </button>
            </div>

            {/* Footer */}
            <div style={{ 
              textAlign: "center", 
              marginTop: "20px", 
              paddingTop: "20px",
              borderTop: "1px solid #e5e7eb",
              flexShrink: 0
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
}
