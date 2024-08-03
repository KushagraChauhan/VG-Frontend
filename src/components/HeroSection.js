import React, { useState, useEffect } from "react";
import './css/HeroSection.css';
import 'animate.css';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    const storedFullName = localStorage.getItem('full_name');
    if (token && email) {
      setIsAuthenticated(true);
      setFullName(storedFullName || '');
    }
  }, []);

  return { isAuthenticated, fullName };
};

const HeroSection = () => {
  const { isAuthenticated, fullName } = useAuth();

  return (
    <section className="hero-section">
      <div className="container">
        
        {isAuthenticated ? (
          <>
            <h1 className="animate__animated animate__pulse" style={{ textTransform: 'uppercase' }}>
            नमस्ते {fullName.length > 20 ? <div className="long-name">{fullName}</div> : fullName}
            </h1>
            <p>Continue your journey into the unknowns of Sanatan with us.</p>
            <div className="hero-buttons">
              <a className="btn-go-to-course" href="/profile">Go to Profile</a>
            </div>
          </>
        ) : (
          <>
            <h1 className="animate__animated animate__pulse">Come Learn With Us</h1>
            <p>Delve into the unknowns of Sanatan With Us</p>
            <div className="hero-buttons">
              <a className="btn-go-to-course" href="/courses">Learn More</a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
