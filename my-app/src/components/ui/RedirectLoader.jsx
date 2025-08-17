import React from 'react'
import './styles.css'

export default function RedirectLoader() {
  return (
    <div className="redirect-loader-overlay">
      <div className="redirect-loader-content">
        <div className="redirect-spinner"></div>
        <h2 className="redirect-title">Redirecting...</h2>
        <p className="redirect-message">Please wait while we redirect you to the requested page.</p>
      </div>
    </div>
  )
}
