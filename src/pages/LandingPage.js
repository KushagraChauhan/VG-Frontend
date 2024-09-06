import React, {useEffect} from 'react';
import LPHeader from '../components/LPHeader';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import HomeCourses from '../components/HomeCourses';
import TopCoursesSection from '../components/TopCoursesSection';
import UserTestimonials from '../components/UserTestimonials'



const LandingPage = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get('referral');
    
    if (referralCode) {
      // Store referral code in localStorage
      localStorage.setItem('referral_code', referralCode);
    }
  }, []);

  return (
    <div>
      <LPHeader />
      <HeroSection />
      <HomeCourses />
      <Features />
      
      {/* <TopCoursesSection /> */}
      {/* <UserTestimonials /> */}
      <Footer />
    </div>
  );
}

export default LandingPage;
