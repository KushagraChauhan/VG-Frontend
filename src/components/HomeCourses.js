import React, { useEffect, useState} from 'react';
import './css/HomeCourses.css';
import 'animate.css';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
   
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    if (token && email) {
      setIsAuthenticated(true);
    }
  }, []);

  return { isAuthenticated };
};

const HomeCourses = () => {
  const { isAuthenticated } = useAuth();
  return (
    <section className="home-courses-section courses-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0  animate__animated animate__fadeInUp">
            <img
              src="home-image.png"
              alt="Home Image"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6  animate__animated animate__fadeInUp">
            <h3>Watch our Courses</h3>
            <p>
              Vibe Gurukul welcomes all seekers with a promise to build pride in our hearts for Bharat and Sanatan Hindu Sanskriti.
            </p>
            {isAuthenticated ? (
            <a href="/courses" className="btn btn-success btn-block">
              Continue your JOURNEY
            </a>
            ) : (
              <a href="/courses" className="btn btn-primary">
              Start your JOURNEY
            </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
