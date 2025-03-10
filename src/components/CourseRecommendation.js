import React from 'react';
import { Link } from "react-router-dom";
import './css/CourseRecommendation.css';

// CourseRecommendation component to display a recommended course
const CourseRecommendation = ({ course }) => {
  return (
    <div className='container mt-4'>
        {/* Container for the course recommendation section */}
        <div className="course-recommendation">
            {/* Heading for the recommendation section */}
            <h2 className='fw-bold' style={{textAlign: 'center'}}>You may also like:</h2>
            
            {/* Card to display the recommended course */}
            <div className="course-recommendation-card">
                {/* Course image */}
                <img src={course.image_url} alt={course.title} className="course-recommendation-image" />
                
                {/* Course information section */}
                <div className="course-recommendation-info">
                    {/* Course title */}
                    <h2 style={{textAlign: 'center', color: '#FFA500'}}>{course.title}</h2>
                    {/* Course description */}
                    <h4 style={{textAlign: 'center', color: '#FF6F61'}}>{course.description}</h4>
                    {/* Link to view the course details */}
                    <div className="go-to-course">
                        <Link to={`/courses/women-in-sanatan-1`}>View Course</Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CourseRecommendation;