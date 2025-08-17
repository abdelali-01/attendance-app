import React from 'react';
import Navbar from '../../layout/Navbar';
import Hero from '../../components/website/Hero';
import Features from '../../components/website/Features';
import HowItWorks from '../../components/website/HowItWorks';
import Benefits from '../../components/website/Benefits';
import PricingPreview from '../../components/website/PricingPreview';
import FAQ from '../../components/website/FAQ';
import Footer from '../../layout/Footer';
import '../../components/website/landing.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Benefits />
      <PricingPreview />
      <FAQ />
      <Footer />
    </>
  );
}
