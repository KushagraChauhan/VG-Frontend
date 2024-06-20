import React from 'react';
import './css/CoursesSection.css';

const CoursesSection = () => {
  return (
    <section className="courses-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png"
              alt="Sample Course"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6">
            <h3>Watch our Courses</h3>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a href="#" className="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;

