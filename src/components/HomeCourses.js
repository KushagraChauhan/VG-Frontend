import React, { useEffect } from 'react';
import './css/HomeCourses.css';
import './css/ScrollAnimation.css';

const HomeCourses = () => {
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
    <section className="home-courses-section courses-section py-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0 scroll-element scroll-slide-up">
            <img
              src="https://mytrialbucket-kush.s3.ap-southeast-2.amazonaws.com/SampleCourses.png"
              alt="Sample Course"
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-6 scroll-element scroll-slide-up">
            <h3>Watch our Courses</h3>
            <p>
              Vibe Gurukul welcomes all seekers of knowledge and we promise to enhance your thinking from the day you take our courses.
            </p>
            <a href="/courses" className="btn btn-primary">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCourses;
