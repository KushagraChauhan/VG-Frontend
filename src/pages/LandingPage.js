import React, {useEffect} from 'react';
import LPHeader from '../components/LPHeader';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import HomeCourses from '../components/HomeCourses';
import TopCoursesSection from '../components/TopCoursesSection';
import UserTestimonials from '../components/UserTestimonials'

const LandingPage = () => {
  return (
    <div>
      <LPHeader />
      <HeroSection />
      <Features />
      <HomeCourses />
      <TopCoursesSection />
      <UserTestimonials />
      <Footer />
    </div>
  );
}

export default LandingPage;
