import React from 'react';
import Navbar from '../../components/website/Navbar';
import Hero from './landing/Hero';
import Features from './landing/Features';
import HowItWorks from './landing/HowItWorks';
import Benefits from './landing/Benefits';
import PricingPreview from './landing/PricingPreview';
import About from './landing/About';
import Footer from './landing/Footer';
import './landing/landing.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <PricingPreview />
      <About />
      <Footer />
    </>
  );
}
