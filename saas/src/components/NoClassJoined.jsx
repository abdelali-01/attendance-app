import React from 'react';

export default function NoClassJoined() {
  return (
    <div className="no-class-joined-container d-flex align-items-center justify-content-center" 
         style={{ 
           minHeight: '60vh', 
           padding: '2rem'
         }}>
      <div className="no-class-card text-center p-5 rounded-4 shadow-sm" 
           style={{ 
             background: 'white', 
             maxWidth: '500px', 
             width: '100%',
             border: '1px solid #e9ecef',
             boxShadow: '0 4px 24px rgba(0,0,0,0.08)'
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
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h3 className="fw-bold mb-3" style={{ color: '#1e293b', fontSize: '1.75rem' }}>
          No Classes Joined Yet
        </h3>

        {/* Description */}
        <p className="text-muted mb-4 fs-6" style={{ lineHeight: '1.6' }}>
          You haven't joined any classes yet. Ask your teacher for a class code to get started, or browse available classes.
        </p>
      </div>
    </div>
  );
}
