import React, {useEffect} from 'react';
import './css/TopCoursesSection.css';
import './css/ScrollAnimation.css';

const TopCoursesSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-element');
      elements.forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
          element.classList.add('scroll-in-view');
        } else {
          element.classList.remove('scroll-in-view');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <section className="top-courses-section">
      <div className="container">
        <div className="section-header scroll-element scroll-slide-up">
          <h2>Make online education accessible</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="courses scroll-element scroll-slide-up">
          <div className="course-card">
            <div className="image-container">
              <img src="https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/itihas-of-bharat.svg" alt="Course 1" />
              <span className="badge">Sale</span>
            </div>
            <div className="course-content">
              <h4>English Department</h4>
              <h3>Lorem ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <ul className="course-info">
                <li><i className="fas fa-users"></i> 15 Sales</li>
                <li><i className="fas fa-clock"></i> 22h</li>
                <li><i className="fas fa-play-circle"></i> 64 Lessons</li>
                <li><i className="fas fa-trophy"></i> Progress</li>
              </ul>
              <div className="course-price">
                <span className="original-price">$16.48</span>
                <span className="discounted-price">$6.48</span>
              </div>
              <a href="#" className="learn-more">Learn More</a>
            </div>
          </div>
          <div className="course-card">
            <div className="image-container">
              <img src="https://vibegurukul-frontend.s3.ap-southeast-2.amazonaws.com/itihas-of-bharat.svg" alt="Course 2" />
              <span className="badge">Sale</span>
            </div>
            <div className="course-content">
              <h4>English Department</h4>
              <h3>Lorem ipsum</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <ul className="course-info">
                <li><i className="fas fa-users"></i> 15 Sales</li>
                <li><i className="fas fa-clock"></i> 22h</li>
                <li><i className="fas fa-play-circle"></i> 64 Lessons</li>
                <li><i className="fas fa-trophy"></i> Progress</li>
              </ul>
              <div className="course-price">
                <span className="original-price">$16.48</span>
                <span className="discounted-price">$6.48</span>
              </div>
              <a href="#" className="learn-more">Learn More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopCoursesSection;
