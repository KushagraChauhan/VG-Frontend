import React from 'react';
import './CoursesSection.css';
// import SampleCourses from './assets/images/SampleCourses.png';

const CoursesSection = () => {
  return (
    <section className="courses-section">
      <div className="container">
        <div className="courses-content">
          <div className="courses-images">
            {/* <img src="" alt="Course 1" className="image-left"/> */}
            <img src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png" alt="Course 2" className="image-right"/>
          </div>
          <div className="courses-text">
            <h3>Watch our Courses</h3>
            <p>
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
            <a href="#" className="learn-more">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
