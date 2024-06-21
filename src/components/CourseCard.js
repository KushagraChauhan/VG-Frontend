import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseCard.css';

const CourseCard = ({ course }) => {
    return(
        <div className='col-md-4 mb-4'>
            <div className='card'>
                <img src={course.preview_image} className='card-img-top preview-image' alt={course.title}></img>
                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>
                    <p className="card-text"><strong>{course.price}</strong></p>
                    <p className="card-text">{course.learnings}</p>
                    <a href="#" className="btn btn-primary">Learn More</a>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;