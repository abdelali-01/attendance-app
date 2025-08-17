import React from 'react';
import './landing.css';

export default function About() {
  return (
    <section className="landing-about" id="about">
      <div className="about-intro">
        <h2>About Attendance App</h2>
        <p>Empowering teachers and students with effortless, accurate, and transparent attendance management.</p>
      </div>
      <div className="about-content-grid">
        <div className="about-mission">
          <h3>Our Mission</h3>
          <p>To eliminate the hassle of paper-based attendance and bring simplicity, speed, and accuracy to classrooms everywhere. We believe every minute saved on admin is a minute gained for learning and growth.</p>
        </div>
        <div className="about-values">
          <h3>Our Values</h3>
          <ul>
            <li><span className="about-icon">🎯</span> <b>Efficiency:</b> Save time for teachers and students alike.</li>
            <li><span className="about-icon">🔍</span> <b>Transparency:</b> Students always know their attendance status.</li>
            <li><span className="about-icon">📈</span> <b>Accuracy:</b> Automated calculations mean no more errors.</li>
            <li><span className="about-icon">🌍</span> <b>Accessibility:</b> Works on any device, anywhere.</li>
            <li><span className="about-icon">🤝</span> <b>Empowerment:</b> Give educators and learners the tools to succeed.</li>
          </ul>
        </div>
      </div>
    </section>
  );
} 