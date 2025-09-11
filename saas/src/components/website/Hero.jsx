import React, { useState, useEffect } from 'react';
import './landing.css';

export default function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    "📱 Mobile-First Design",
    "⚡ Real-time Updates", 
    "📊 Smart Analytics",
    "🔒 Secure & Private"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <section className="landing-hero">
      <div className="hero-bg-animated"></div>
      <div className="hero-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-icon">🚀</span>
          <span>Trusted by 1000+ Schools</span>
        </div>
        
        <h1>
          Transform Your Classroom with
          <span className="hero-highlight"> Smart Attendance</span>
        </h1>
        
        <p className="hero-description">
          Say goodbye to paper attendance sheets! Our intelligent system helps teachers 
          track attendance in seconds while giving students real-time insights into their progress.
        </p>
        
        <div className="hero-features-rotating">
          <div className="feature-text">
            {features[currentFeature]}
          </div>
        </div>
        
        <div className="hero-actions">
          <a href="#features" className="hero-cta primary">
            Start Free Trial <span className="hero-cta-icon">→</span>
          </a>
          <a href="#demo" className="hero-cta secondary">
            <span className="play-icon">▶</span>
            Watch Demo
          </a>
        </div>

      </div>
      
      <div className="hero-visual">
        <div className="hero-illustration-main">
          <div className="hero-geometric-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
          
          <div className="hero-center-element">
            <div className="center-icon">📱</div>
            <div className="center-glow"></div>
          </div>
          
          <div className="hero-floating-elements">
            <div className="floating-element element-1">
              <div className="element-icon">✓</div>
              <div className="element-trail"></div>
            </div>
            <div className="floating-element element-2">
              <div className="element-icon">📊</div>
              <div className="element-trail"></div>
            </div>
            <div className="floating-element element-3">
              <div className="element-icon">🔔</div>
              <div className="element-trail"></div>
            </div>
          </div>
          
          <div className="hero-connecting-dots">
            <div className="dot dot-1"></div>
            <div className="dot dot-2"></div>
            <div className="dot dot-3"></div>
            <div className="dot dot-4"></div>
            <div className="dot dot-5"></div>
            <div className="dot dot-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 