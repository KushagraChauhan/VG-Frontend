import React from 'react';
import { Link } from "react-router-dom";
import './css/CourseRecommendation.css';

const CourseRecommendation = ({ course }) => {
  return (
    <div className='container mt-4'>
        <div className="course-recommendation">
        <h2 className='fw-bold' style={{textAlign: 'center'}}>You may also like:</h2>
        
        <div className="course-recommendation-card">
            <img src={course.image_url} alt={course.title} className="course-recommendation-image" />
            
            <div className="course-recommendation-info">
                <h2 style={{textAlign: 'center', color: '#FFA500'}}>{course.title}</h2>
                <h4 style={{textAlign: 'center', color: '#FF6F61'}}>{course.description}</h4>
                {/* <h5 style={{textAlign: 'center'}}>{course.learnings}</h5> */}
                <div className="go-to-course">
                    <Link to={`/courses/66800bbed1be9b59bcf40603`}>View Course</Link>
                </div>
            </div>
        </div>
        </div>
    </div>
  );
};

export default CourseRecommendation;
