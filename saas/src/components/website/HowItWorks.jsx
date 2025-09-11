import React from 'react';
import './landing.css';

const steps = [
  { title: 'Sign Up', desc: 'Create your free account as a teacher or student.' },
  { title: 'Create or Join Classes', desc: 'Teachers create classes, students join with a code.' },
  { title: 'Track Attendance', desc: 'Mark attendance digitally and view records instantly.' },
];

export default function HowItWorks() {
  return (
    <section className="landing-how">
      <h2>How It Works</h2>
      <div className="how-steps-vertical">
        {steps.map((s, i) => (
          <div className="how-step-vertical" key={i}>
            <div className="how-step-number">{i + 1}</div>
            <div className="how-step-content">
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 