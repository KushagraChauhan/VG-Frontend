import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';

const CourseDetails = ( {course} ) => {
    return(
    <div className="course-details-container">
      <div className="row">
        <div className="col-md-4">
          <img src={course.preview_image} alt={course.title} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h1 className="course-title">{course.title}</h1>
            <div className="course-info">
                <p><strong>Description:</strong> {course.description}</p>
                <p><strong>Learnings:</strong> {course.learnings}</p>
                <p><strong>USP:</strong> {course.usp}</p>
            </div>
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>
      <div className="course-sections">
            <h2>Sections</h2>
            <ul>
                {course.sections.map((section, index) => (
                    <li key={index}>
                        <h3 className="section-heading">{section.heading}</h3>
                        <p className="section-duration">Duration: {section.duration}</p>
                        <ul className="section-videos">
                            {section.videos.map((video, vIndex) => (
                                <li key={vIndex}>{video.title} - {video.duration}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
     </div>
    );
}

export default CourseDetails;