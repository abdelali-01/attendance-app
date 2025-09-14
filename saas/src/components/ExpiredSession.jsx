import React, { useState, useEffect } from 'react';

export default function ExpiredSession() {
  const [showContent, setShowContent] = useState(false);
  const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
  const loginUrl = `${websiteUrl}/login`;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    window.location.href = websiteUrl;
  };

  const handleGoLogin = () => {
    window.location.href = loginUrl;
  };

  if (!showContent) {
    return null;
  }

  return (
    <div className="expired-session-container d-flex align-items-center justify-content-center" 
         style={{ 
           minHeight: '100vh', 
           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           padding: '2rem'
         }}>
      <div className="expired-session-card text-center p-5 rounded-4 shadow-lg" 
           style={{ 
             background: 'white', 
             maxWidth: '500px', 
             width: '100%',
             border: '1px solid rgba(255,255,255,0.2)'
           }}>
        
        {/* Icon */}
        <div className="mb-4">
          <div className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
               style={{ 
                 width: '80px', 
                 height: '80px', 
                 background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                 color: 'white'
               }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="15" y1="9" x2="9" y2="15"/>
              <line x1="9" y1="9" x2="15" y2="15"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="fw-bold mb-3" style={{ color: '#2c3e50', fontSize: '2rem' }}>
          Session Expired
        </h2>

        {/* Description */}
        <p className="text-muted mb-4 fs-5" style={{ lineHeight: '1.6' }}>
          Your session has expired for security reasons. Please log in again to continue using the application.
        </p>

        {/* Action Buttons */}
        <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <button 
            onClick={handleGoHome}
            className="btn btn-outline-primary px-4 py-3 rounded-pill fw-semibold"
            style={{ 
              borderWidth: '2px',
              fontSize: '1rem',
              minWidth: '140px'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
            Go Home
          </button>
          
          <button 
            onClick={handleGoLogin}
            className="btn btn-primary px-4 py-3 rounded-pill fw-semibold"
            style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              fontSize: '1rem',
              minWidth: '140px'
            }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10,17 15,12 10,7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            Login Again
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid #e9ecef' }}>
          <small className="text-muted">
            Need help? Contact our support team for assistance.
          </small>
        </div>
      </div>
    </div>
  );
}
