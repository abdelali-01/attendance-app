import React from 'react'

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-badge">
                <span className="badge-icon">🚀</span>
                <span>About Our Mission</span>
              </div>
              <h1 className="hero-title">
                Revolutionizing <span className="hero-highlight">Attendance Management</span> for Modern Education
              </h1>
              <p className="hero-description">
                Transform your educational institution with our comprehensive digital attendance system. 
                Say goodbye to paper-based tracking and embrace efficiency, accuracy, and real-time insights.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <div className="stat-number">1000+</div>
                  <div className="stat-label">Active Users</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50+</div>
                  <div className="stat-label">Institutions</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">99.9%</div>
                  <div className="stat-label">Uptime</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-visual">
                <div className="hero-illustration-main">
                  <div className="hero-geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                  </div>
                  
                  <div className="hero-center-element">
                    <div className="center-icon">📚</div>
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
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="landing-features">
        <div className="container">
          <div className="features-intro">
            <h2>Our Mission</h2>
            <p>
              To democratize digital education management by providing affordable, 
              scalable, and user-friendly attendance tracking solutions that empower 
              educators and enhance student engagement.
            </p>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="landing-how">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="feature-card-modern">
                <div className="feature-icon-modern">⚠</div>
                <div className="feature-content">
                  <h3>The Problem</h3>
                  <ul className="problem-list">
                    <li>Manual attendance tracking is time-consuming</li>
                    <li>Paper-based systems are prone to errors</li>
                    <li>Difficult to generate insights and reports</li>
                    <li>No real-time monitoring capabilities</li>
                    <li>Limited scalability for growing institutions</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="feature-card-modern">
                <div className="feature-icon-modern">✓</div>
                <div className="feature-content">
                  <h3>Our Solution</h3>
                  <ul className="solution-list">
                    <li>Digital attendance tracking in real-time</li>
                    <li>Automated calculations and reporting</li>
                    <li>WebSocket-powered live updates</li>
                    <li>Scalable subscription-based plans</li>
                    <li>Comprehensive analytics dashboard</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="landing-features">
        <div className="container">
          <div className="features-intro">
            <h2>How It Works</h2>
            <p>Simple steps to transform your attendance management</p>
          </div>
          <div className="how-steps-vertical">
            <div className="how-step-vertical">
              <div className="how-step-number">1</div>
              <div className="how-step-content">
                <h3>Create Classes</h3>
                <p>Teachers set up classes with custom attendance parameters and generate unique share codes.</p>
              </div>
            </div>
            <div className="how-step-vertical">
              <div className="how-step-number">2</div>
              <div className="how-step-content">
                <h3>Students Join</h3>
                <p>Students join classes using share codes and are automatically enrolled in the system.</p>
              </div>
            </div>
            <div className="how-step-vertical">
              <div className="how-step-number">3</div>
              <div className="how-step-content">
                <h3>Track Attendance</h3>
                <p>Real-time attendance tracking with instant updates and automatic mark calculations.</p>
              </div>
            </div>
            <div className="how-step-vertical">
              <div className="how-step-number">4</div>
              <div className="how-step-content">
                <h3>Generate Reports</h3>
                <p>Comprehensive reports and analytics for teachers, students, and administrators.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="landing-how">
        <div className="container">
          <div className="features-intro">
            <h2>Key Features</h2>
            <p>Everything you need for modern attendance management</p>
          </div>
          <div className="features-grid">
            <div className="feature-card-modern">
              <div className="feature-icon-modern">📈</div>
              <div className="feature-content">
                <h3>Real-time Analytics</h3>
                <p>Live attendance statistics and performance metrics with interactive charts and graphs.</p>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon-modern">🛡️</div>
              <div className="feature-content">
                <h3>Secure & Reliable</h3>
                <p>Enterprise-grade security with encrypted data, secure authentication, and regular backups.</p>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon-modern">📱</div>
              <div className="feature-content">
                <h3>Mobile-First Design</h3>
                <p>Responsive design that works seamlessly across all devices and screen sizes.</p>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon-modern">🔔</div>
              <div className="feature-content">
                <h3>Smart Notifications</h3>
                <p>Automated email reminders, attendance alerts, and subscription notifications.</p>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon-modern">👥</div>
              <div className="feature-content">
                <h3>Multi-User Support</h3>
                <p>Role-based access control for teachers, students, and administrators.</p>
              </div>
            </div>
            <div className="feature-card-modern">
              <div className="feature-icon-modern">📋</div>
              <div className="feature-content">
                <h3>Advanced Reporting</h3>
                <p>Customizable reports, export functionality, and data visualization tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="landing-features">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="founder-content">
                <div className="features-intro text-start">
                  <h2>Meet Our Founder</h2>
                </div>
                <h3 className="founder-name">Abdelali Aribi</h3>
                <p className="founder-title">Full-Stack Developer & Education Technology Enthusiast</p>
                <p className="founder-bio">
                  Abdelali is a passionate developer with a vision to transform traditional 
                  education systems through innovative technology solutions. With expertise 
                  in modern web technologies and a deep understanding of educational needs, 
                  he created this attendance management system to address real-world challenges 
                  faced by educators and students.
                </p>
                <div className="founder-skills">
                  <span className="skill-tag">React.js</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">Express.js</span>
                  <span className="skill-tag">WebSockets</span>
                </div>
                <div className="founder-contact">
                  <a href="mailto:aliaribi47@gmail.com" className="contact-link">
                    <span className="contact-icon">✉</span> aliaribi47@gmail.com
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="founder-visual">
                <div className="hero-illustration-main">
                  <div className="hero-geometric-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                    <div className="shape shape-3"></div>
                    <div className="shape shape-4"></div>
                  </div>
                  
                  <div className="hero-center-element">
                    <div className="center-icon">👨‍💻</div>
                    <div className="center-glow"></div>
                  </div>
                  
                  <div className="hero-floating-elements">
                    <div className="floating-element element-1">
                      <div className="element-icon">💻</div>
                      <div className="element-trail"></div>
                    </div>
                    <div className="floating-element element-2">
                      <div className="element-icon">🚀</div>
                      <div className="element-trail"></div>
                    </div>
                    <div className="floating-element element-3">
                      <div className="element-icon">💡</div>
                      <div className="element-trail"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-pricing-preview">
        <div className="container text-center">
          <div className="pricing-preview-card">
            <h2>Ready to Transform Your Attendance Management?</h2>
            <p>Join thousands of educators who have already modernized their attendance tracking</p>
            <div className="cta-buttons">
              <a href="/signup" className="pricing-cta">
                Get Started Free <span className="pricing-cta-icon">→</span>
              </a>
              <a href="/Pricing" className="amazing-btn-outline">
                View Plans
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .about-page {
          background: #fff;
        }

        .about-hero {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4rem 2rem 2rem 2rem;
          background: linear-gradient(135deg, var(--primary) 0%, #6a82fb 50%, #8b9fff 100%);
          color: #fff;
          border-radius: 0 0 2rem 2rem;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          gap: 2rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2rem;
          padding: 0.5rem 1rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .badge-icon {
          font-size: 1.2rem;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          line-height: 1.1;
        }

        .hero-highlight {
          background: linear-gradient(45deg, #fff, #f0f8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
        }

        .hero-description {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          line-height: 1.6;
          opacity: 0.95;
          max-width: 540px;
        }

        .hero-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.3rem;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.8;
          font-weight: 500;
        }

        .hero-visual {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          gap: 2rem;
          height: 100%;
        }

        .hero-illustration-main {
          position: relative;
          width: 400px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-geometric-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float-shape 8s ease-in-out infinite;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          top: 70%;
          right: 15%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 20%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 40px;
          height: 40px;
          top: 30%;
          right: 30%;
          animation-delay: 6s;
        }

        @keyframes float-shape {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.8;
          }
        }

        .hero-center-element {
          position: relative;
          z-index: 3;
          text-align: center;
        }

        .center-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
        }

        .center-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          border-radius: 50%;
          z-index: -1;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }

        .hero-floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .floating-element {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: float-element 6s ease-in-out infinite;
        }

        .element-icon {
          background: rgba(255, 255, 255, 0.9);
          color: var(--primary);
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: bold;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .element-trail {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.6) 0%, transparent 100%);
          border-radius: 1px;
        }

        .element-1 {
          top: 15%;
          right: 25%;
          animation-delay: 0s;
        }

        .element-2 {
          top: 45%;
          left: 15%;
          animation-delay: 2s;
        }

        .element-3 {
          bottom: 25%;
          right: 20%;
          animation-delay: 4s;
        }

        @keyframes float-element {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) translateX(-10px);
            opacity: 1;
          }
        }

        .hero-connecting-dots {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .dot {
          position: absolute;
          width: 6px;
          height: 6px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: pulse-dot 4s ease-in-out infinite;
        }

        .dot-1 { top: 20%; left: 30%; animation-delay: 0s; }
        .dot-2 { top: 35%; right: 25%; animation-delay: 0.5s; }
        .dot-3 { top: 60%; left: 40%; animation-delay: 1s; }
        .dot-4 { top: 75%; right: 35%; animation-delay: 1.5s; }
        .dot-5 { bottom: 30%; left: 25%; animation-delay: 2s; }
        .dot-6 { bottom: 45%; right: 40%; animation-delay: 2.5s; }

        @keyframes pulse-dot {
          0%, 100% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.8;
          }
        }

        .problem-list, .solution-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .problem-list li, .solution-list li {
          padding: 8px 0;
          position: relative;
          padding-left: 25px;
          color: #555;
          font-size: 1rem;
        }

        .problem-list li:before {
          content: "✗";
          color: #ef4444;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .solution-list li:before {
          content: "✓";
          color: #10b981;
          position: absolute;
          left: 0;
          font-weight: bold;
        }

        .founder-name {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 10px;
        }

        .founder-title {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .founder-bio {
          font-size: 1.1rem;
          color: #555;
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .founder-skills {
          margin-bottom: 25px;
        }

        .skill-tag {
          display: inline-block;
          background: linear-gradient(135deg, var(--primary) 60%, #6a82fb 100%);
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          margin: 5px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 2px 8px rgba(90,87,255,0.10);
        }

        .founder-contact {
          margin-top: 20px;
        }

        .contact-link {
          color: var(--primary);
          text-decoration: none;
          font-size: 1.1rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 15px 25px;
          background: #f7f7ff;
          border-radius: 25px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .contact-link:hover {
          background: var(--primary);
          color: white;
          transform: translateY(-2px);
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(90,87,255,0.3);
        }

        .contact-icon {
          font-size: 1.2rem;
        }

        .founder-visual {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }

        @media (max-width: 900px) {
          .about-hero {
            flex-direction: column;
            text-align: center;
            padding: 3rem 1rem 1rem 1rem;
            gap: 3rem;
          }
          
          .hero-title {
            font-size: 2.8rem;
          }
          
          .hero-description {
            font-size: 1.1rem;
          }
          
          .hero-stats {
            justify-content: center;
          }
          
          .hero-illustration-main {
            width: 300px;
            height: 300px;
          }
          
          .center-icon {
            font-size: 3rem;
          }
          
          .center-glow {
            width: 80px;
            height: 80px;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
        }

        @media (max-width: 600px) {
          .about-hero {
            padding: 2rem 1rem 1rem 1rem;
          }
          
          .hero-title {
            font-size: 2.2rem;
          }
          
          .hero-description {
            font-size: 1rem;
          }
          
          .hero-stats {
            gap: 1rem;
          }
          
          .hero-illustration-main {
            width: 250px;
            height: 250px;
          }
          
          .center-icon {
            font-size: 2.5rem;
          }
          
          .center-glow {
            width: 60px;
            height: 60px;
          }
        }
      `}</style>
    </div>
  )
}
