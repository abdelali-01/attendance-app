import React from 'react';
import './landing.css';
import { Link } from 'react-router-dom';

export default function PricingPreview() {
  return (
    <section className="landing-pricing-preview">
      <div className="pricing-preview-card">
        <h2>Simple, Transparent Pricing</h2>
        <p>Start for free. Upgrade anytime for more features.</p>
        <Link to="/pricing" className="pricing-cta">
          See Pricing <span className="pricing-cta-icon">→</span>
        </Link>
      </div>
    </section>
  );
} 