import React from 'react';
import './landing.css';

export default function Hero() {
  return (
    <section className="landing-hero">
      <div className="hero-bg-animated"></div>
      <div className="hero-content">
        <h1>Effortless Attendance Tracking</h1>
        <p>Save time, reduce paperwork, and empower teachers and students with digital attendance management.</p>
        <a href="#features" className="hero-cta">
          Get Started Free <span className="hero-cta-icon">→</span>
        </a>
      </div>
      <div className="hero-illustration">
        {/* Illustration or SVG goes here */}
        <div className="hero-illustration-placeholder">[Modern Illustration]</div>
      </div>
    </section>
  );
} 