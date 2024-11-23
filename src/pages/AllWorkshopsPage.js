import React, { useEffect, useState } from 'react';
import AllWorkshops from '../components/AllWorkshops';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';
import LoadingSpinner from '../components/Loading';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  return { isAuthenticated, isLoading };
};

const AllWorkshopsPage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="AllCoursesPage">
      {isAuthenticated ? <Header /> : <LPHeader />}
      <AllWorkshops />
      {/* <Footer /> */}
    </div>
  );
}

export default AllWorkshopsPage;
