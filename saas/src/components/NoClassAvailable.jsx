import React from "react";
import { Link } from "react-router-dom";

export default function NoClassAvailable() {
  return (
    <div className="no-class-available-container d-flex align-items-center justify-content-center" 
         style={{ 
           minHeight: '60vh', 
           padding: '2rem'
         }}>
      <div className="no-class-card text-center p-5" 
           style={{ 
             maxWidth: '500px', 
             width: '100%',
           }}>
        
        {/* Icon */}
        <div className="mb-4">
          <div className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
               style={{ 
                 width: '80px', 
                 height: '80px', 
                 background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                 color: 'white'
               }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="fw-bold mb-3" style={{ color: '#1e293b', fontSize: '1.75rem' }}>
          No Classes Available
        </h3>

        {/* Description */}
        <p className="text-muted mb-4 fs-6" style={{ lineHeight: '1.6' }}>
          Get started by creating your first class to track attendance and manage your students.
        </p>

        {/* Action Button */}
        <div className="d-flex justify-content-center">
          <Link to="/add-class" style={{ textDecoration: 'none' }}>
            <button 
              className="btn btn-primary px-4 py-3 rounded-pill fw-semibold"
              style={{ 
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                border: 'none',
                fontSize: '0.95rem',
                minWidth: '180px'
              }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Create Your First Class
            </button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-4 pt-3" style={{ borderTop: '1px solid #f1f5f9' }}>
          <small className="text-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="me-1">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
            Need help? Check our guide for creating classes.
          </small>
        </div>
      </div>
    </div>
  );
}
