import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';

const CourseDetails = ( {course} ) => {
    return(
      <div className='course-details-container'>
      <div className="container mt-4">
      <div className="row">
          <div className="col-md-8">
              <h1 className="display-4">{course.title}</h1>
              <img src={course.preview_image} className="img-fluid rounded mb-4" alt={course.title} />
              <div className="mb-4">
                  <p><strong>Description:</strong> {course.description}</p>
                  <p><strong>Learnings:</strong> {course.learnings}</p>
                  <p><strong>USP:</strong> {course.usp}</p>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card mb-4">
                  <div className="card-body">
                      <h5 className="card-title">Try the course now...</h5>
                      <a href="#" className="btn btn-primary btn-block">Enroll Now</a>
                  </div>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col-12">
              <h2>Sections</h2>
              <ul className="list-group">
                  {course.sections.map((section, index) => (
                      <li key={index} className="list-group-item">
                          <h5>{section.heading}</h5>
                          <p className="text-muted">Duration: {section.duration} minutes</p>
                          <ul className="list-unstyled">
                              {section.videos.map((video, vIndex) => (
                                  <li key={vIndex}>{video.title} - {video.duration} minutes</li>
                              ))}
                          </ul>
                      </li>
                  ))}
              </ul>
          </div>
      </div>
  </div>
  </div>
    );
}

export default CourseDetails;