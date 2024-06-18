import React from 'react';
//import TopCourses from './TopCourses';
import './css/TopCoursesSection.css';

const TopCoursesSection = () => {
  return (
    <section className="top-courses-section">
      <div className="container">
        <div className="section-header">
          <h3>Practice Advice</h3>
          <h2>Make online education accessible</h2>
          <p>Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
        </div>
        <div className="courses">
          <div className="course-card">
            <div className="image-container">
              <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/Course1.jpg" alt="Course 1" />
              <span className="badge">Sale</span>
            </div>
            <div className="course-content">
              <h4>English Department</h4>
              <h3>Graphic Design</h3>
              <p>We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
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
              <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/Course2.jpg" alt="Course 2" />
              <span className="badge">Sale</span>
            </div>
            <div className="course-content">
              <h4>English Department</h4>
              <h3>Graphic Design</h3>
              <p>We focus on ergonomics and meeting you where you work. It's only a keystroke away.</p>
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
