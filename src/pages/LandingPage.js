import React, {useEffect} from 'react';
import LPHeader from '../components/LPHeader';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import CoursesSection from '../components/CoursesSection';
import TopCoursesSection from '../components/TopCoursesSection';
import UserTestimonials from '../components/UserTestimonials'

const LandingPage = () => {
  return (
    <div>
      <LPHeader />
      <HeroSection />
      <Features />
      <CoursesSection />
      <TopCoursesSection />
      <UserTestimonials />
      <Footer />
    </div>
  );
}

export default LandingPage;
