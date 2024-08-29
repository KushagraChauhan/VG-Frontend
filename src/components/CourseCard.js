import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './css/CourseCard.css'; // Importing custom CSS for additional styling
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

// CourseCard component to display individual course cards
const CourseCard = ({ course }) => {
    // Array containing the learnings and unique selling points (USP) of the course
    const text = [course.learnings, course.usp];
    
    // Corresponding headings for the learnings and USP sections
    const headings = ['Learnings:', 'USP:'];

    // Function to format and render the learnings and USP text with line breaks
    const formattedText = (textArray) => {      
        return textArray.map((content, index) => (
          <div key={index} className="card-text">
            <h5 className='card-heading'>{headings[index]}</h5>
            <p>
              {/* Split content by newline and render each line separately */}
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

    // Rendering the course card with course details
    return(
        <div className='col-md-4 mb-4'>
            <div className='card'>
                {/* Course preview image */}
                <img src={course.preview_image} className='card-img-top preview-image' alt={course.title}></img>
                <div className="card-body">
                    {/* Course title */}
                    <h5 className="card-title">{course.title}</h5>
                    {/* Course description */}
                    <p className="card-text">{course.description}</p>
                    {/* Render formatted learnings and USP */}
                    {formattedText(text)}
                    {/* Course price */}
                    <p className="card-text"><strong>Price: ₹ {course.price} </strong></p>
                    {/* Link to view more details about the course */}
                    <div className="go-to-course">
                      <Link to={`/courses/${course._id}`}>View Course</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
