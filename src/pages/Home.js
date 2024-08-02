import React, {useEffect} from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Footer from '../components/Footer';
import HomeCourses from '../components/HomeCourses';
import TopCoursesSection from '../components/TopCoursesSection';
import UserTestimonials from '../components/UserTestimonials';

const useAuth = () => {
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      if (token && email) {
        //console.log('User is logged in with token:', token);
        //console.log('User is logged in');
      }
    }, []);
  };

const Home = () => {
    useAuth();

  return (
    <div>
      <Header />
      <HeroSection />
      <HomeCourses />
      <Features />    
      {/* <TopCoursesSection /> */}
      <UserTestimonials />
      <Footer />
    </div>
  );
}

export default Home;