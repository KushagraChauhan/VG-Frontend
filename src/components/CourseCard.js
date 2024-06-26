import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseCard.css';
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
    const text = [course.learnings, course.usp];
    const headings = ['Learnings:', 'USP:'];

    const formattedText = (textArray) => {      
        return textArray.map((content, index) => (
          <div key={index} className="card-text">
            <h5 className='card-heading'>{headings[index]}</h5>
            <p>
              {content.split('\n').map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        ));
      };

    return(
        <div className='col-md-4 mb-4'>
            <div className='card'>
                <img src={course.preview_image} className='card-img-top preview-image' alt={course.title}></img>
                <div className="card-body">
                    <h5 className="card-title">{course.title}</h5>
                    <p className="card-text">{course.description}</p>             
                    {formattedText(text)}
                    <p className="card-text"><strong>Price: {course.price} </strong></p>
                    <div className="go-to-course">
                      <Link to={`/courses/${course._id}`}>View Course</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;