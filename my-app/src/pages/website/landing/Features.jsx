import React from 'react';
import './landing.css';

const features = [
  { icon: '📝', title: 'Smart Attendance', desc: 'Add, update, and delete attendance records with ease.' },
  { icon: '🏫', title: 'Class Management', desc: 'Create and manage classes and student lists.' },
  { icon: '⚡', title: 'Automatic Marks', desc: 'Attendance marks are calculated automatically.' },
  { icon: '👩‍🎓', title: 'Student Access', desc: 'Students can view their attendance and absences.' },
  { icon: '📊', title: 'Detailed Stats', desc: 'Generate detailed attendance and absence statistics.' },
  { icon: '🔒', title: 'Role-Based Access', desc: 'Separate dashboards for teachers and students.' },
  { icon: '📱', title: 'Mobile Friendly', desc: 'Works great on any device.' },
];

export default function Features() {
  return (
    <section className="landing-features" id="features">
      <div className="features-intro">
        <h2>Main Features</h2>
        <p>Everything you need to manage attendance, classes, and student engagement—beautifully simple and powerful.</p>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-card-modern" key={i}>
            <div className="feature-icon-modern">{f.icon}</div>
            <div className="feature-content">
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 