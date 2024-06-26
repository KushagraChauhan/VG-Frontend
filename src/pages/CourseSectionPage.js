import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CourseSections from '../components/CourseSections';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';
//import '../css/CourseSectionPage.css';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      if (token && email) {
        setIsAuthenticated(true);
      }
    }, []);
  
    return isAuthenticated;
  };

const CourseSectionPage = () => {
    const isAuthenticated = useAuth();
    return (
    <div>
        {isAuthenticated ? <Header /> : <LPHeader />}
        <CourseSections />
        <Footer />
    </div>
    );
};

export default CourseSectionPage;
