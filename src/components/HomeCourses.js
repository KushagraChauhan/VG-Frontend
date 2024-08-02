import React, { useEffect } from 'react';
import './css/HomeCourses.css';
import 'animate.css';

const HomeCourses = () => {
  return (
    <section className="home-courses-section courses-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0  animate__animated animate__fadeInUp">
            <img
              src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png"
              alt="Sample Course"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6  animate__animated animate__fadeInUp">
            <h3>Watch our Courses</h3>
            <p>
              Vibe Gurukul welcomes all seekers with a promise to build pride in our hearts for Bharat and Sanatan Hindu Sanskriti.
            </p>
            <a href="/courses" className="btn btn-primary">
              Start your JOURNEY
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
