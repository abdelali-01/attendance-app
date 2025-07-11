import React from 'react';
import './landing.css';

const benefits = [
  { stat: '90%', label: 'Less Paperwork' },
  { stat: '2x', label: 'Faster Attendance' },
  { stat: '99%', label: 'Accuracy' },
  { stat: '100%', label: 'Student Transparency' },
];

export default function Benefits() {
  return (
    <section className="landing-benefits">
      <h2>Why Choose Us?</h2>
      <div className="benefits-list">
        {benefits.map((b, i) => (
          <div className="benefit-card" key={i}>
            <div className="benefit-stat">{b.stat}</div>
            <div className="benefit-label">{b.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 