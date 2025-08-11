import React from 'react'
import './settings.css'
import UpdateProfile from './UpdateProfile'
import EmailNotification from './EmailNotification'
import Reminder from './Reminder'
import PlanSection from './PlanSection'

export default function Settings() {
  return (
    <div className='settings-page'>
      <div className="container py-5">
        {/* Header Section */}
        <div className="settings-header mb-5">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h1 className="fw-bold mb-3" style={{ 
                fontSize: "2.5rem", 
                color: "#1e293b",
                fontFamily: "Poppins, sans-serif"
              }}>
                Settings
              </h1>
              <p className="fs-5 text-secondary mb-0" style={{ fontFamily: "Poppins, sans-serif" }}>
                Manage your account settings, preferences, and subscription plan
              </p>
            </div>
            <div className="col-lg-4 text-end">
              <div className="settings-stats d-inline-flex align-items-center p-3 rounded-4" style={{
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                border: "1px solid #e2e8f0"
              }}>
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
                <div className="text-start">
                  <div className="fw-semibold" style={{ color: "#1e293b", fontSize: "0.9rem" }}>
                    Account Status
                  </div>
                  <div className="text-secondary" style={{ fontSize: "0.8rem" }}>
                    Active & Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="row g-4">
          {/* Plan Section - Full Width */}
          <div className="col-12">
            <PlanSection />
          </div>
          
          {/* Profile Section */}
          <div className="col-lg-6">
            <UpdateProfile />
          </div>
          
          {/* Notifications Section */}
          <div className="col-lg-6">
            <EmailNotification />
          </div>
        </div>

        {/* Additional Features Section */}
        {/* <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4" style={{
              background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
              border: "1px solid #fbbf24"
            }}>
              <div className="d-flex align-items-center mb-3">
                <div className="me-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                    color: "white"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: "#92400e" }}>
                    Coming Soon
                  </h5>
                  <p className="mb-0" style={{ color: "#a16207", fontSize: "0.9rem" }}>
                    Advanced reminder settings and more customization options
                  </p>
                </div>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.5)" }}>
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12,6 12,12 16,14"></polyline>
                        </svg>
                      </div>
                      <span className="fw-semibold" style={{ color: "#92400e", fontSize: "0.9rem" }}>
                        Smart Reminders
                      </span>
                    </div>
                    <p className="mb-0" style={{ color: "#a16207", fontSize: "0.8rem" }}>
                      Automated attendance reminders
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.5)" }}>
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14,2 14,8 20,8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10,9 9,9 8,9"></polyline>
                        </svg>
                      </div>
                      <span className="fw-semibold" style={{ color: "#92400e", fontSize: "0.9rem" }}>
                        Advanced Reports
                      </span>
                    </div>
                    <p className="mb-0" style={{ color: "#a16207", fontSize: "0.8rem" }}>
                      Detailed analytics & insights
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 rounded-3" style={{ background: "rgba(255,255,255,0.5)" }}>
                    <div className="d-flex align-items-center mb-2">
                      <div className="me-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <span className="fw-semibold" style={{ color: "#92400e", fontSize: "0.9rem" }}>
                        Messaging
                      </span>
                    </div>
                    <p className="mb-0" style={{ color: "#a16207", fontSize: "0.8rem" }}>
                      Direct communication with students
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
