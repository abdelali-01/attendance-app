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
      </div>
    </div>
  )
}
