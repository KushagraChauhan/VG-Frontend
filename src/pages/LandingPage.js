import React, {useEffect} from 'react';
import LPHeader from '../components/LPHeader';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div>
      <LPHeader />
      <HeroSection />
      <Features />
      <Footer />
    </div>
  );
}

export default LandingPage;
