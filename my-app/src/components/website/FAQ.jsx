import React, { useState } from 'react';
import './landing.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How does the attendance tracking work?",
      answer: "Our app uses a simple and intuitive interface where teachers can mark students present, absent, or late with just a few taps. The system automatically calculates attendance percentages and generates detailed reports."
    },
    {
      question: "Can students view their own attendance?",
      answer: "Yes! Students have access to their personal dashboard where they can view their attendance history, current status, and receive notifications about their attendance records."
    },
    {
      question: "Is the app available on mobile devices?",
      answer: "Absolutely! Our attendance app is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. You can access it from any device with an internet connection."
    },
    {
      question: "How secure is the attendance data?",
      answer: "We prioritize data security with encrypted connections, secure authentication, and regular backups. Your attendance data is protected and only accessible to authorized users within your institution."
    },
    {
      question: "Can I export attendance reports?",
      answer: "Yes, you can generate and export detailed attendance reports in various formats. These reports are perfect for administrative purposes, parent meetings, or compliance requirements."
    },
    {
      question: "How much does it cost?",
      answer: "We offer flexible pricing plans starting from free for small classes to premium plans for larger institutions. Check our pricing page for detailed information about features and costs."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="landing-faq" id="faq">
      <div className="faq-intro">
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about our attendance management system</p>
      </div>
      <div className="faq-container">
        {faqData.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'faq-open' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">
                {openIndex === index ? '−' : '+'}
              </span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 