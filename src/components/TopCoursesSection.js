import React from 'react';
import TopCourses from './TopCourses';
import './TopCoursesSection.css';

const TopCoursesSection = () => {
  return (
    <section className="online-education-section">
      <h2>Make online education accessible</h2>
      <p>Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics</p>
      <div className="product-cards">
        <TopCourses />
      </div>
    </section>
  );
};

export default TopCoursesSection;
