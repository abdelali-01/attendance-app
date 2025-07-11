import React from 'react';
import './landing.css';

export default function Footer() {
  return (
    <footer className="landing-footer">
      <div>© {new Date().getFullYear()} Attendance App. All rights reserved.</div>
    </footer>
  );
} 