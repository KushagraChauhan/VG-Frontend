import React,  {useEffect, useState}  from 'react';
import AllCourses from '../components/AllCourses';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';

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

const AllCoursesPage= () => {
  const isAuthenticated = useAuth();
  return (
    <div className="AllCoursesPage">
      {isAuthenticated ? <Header /> : <LPHeader />}
      <AllCourses />
      <Footer />
    </div>
  );
}

export default AllCoursesPage;
