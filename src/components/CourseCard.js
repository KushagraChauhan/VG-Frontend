import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap CSS for styling
import './css/CourseCard.css'; // Importing custom CSS for additional styling
import { Link } from "react-router-dom"; // Importing Link for navigation between routes

// CourseCard component to display individual course cards
const CourseCard = ({ course }) => {   
    return(
      <div className='col-md-4 mb-4'>
        <div className='card position-relative'>
            {/* Conditional rendering for stamp */}
            {course.short_title === 'women-in-sanatan-1' && (
                <div className="stamp text-white position-absolute top-0 end-0 p-2 m-2 rounded" style={{background: "#FFA500"}}>
                    100+ Enrollments
                </div>
            )}
            {course.short_title === 'bal-kand' && (
                <div className="stamp text-white position-absolute top-0 end-0 p-2 m-2 rounded" style={{background: "#FF6F61"}}>
                    50+ Enrollments
                </div>
            )}
            {/* Course preview image */}
            <img src={course.preview_image} className='card-img-top preview-image' alt={course.title} />
            <div className="card-body">
                {/* Course title */}
                <h5 className="card-title">{course.title}</h5>
                {/* Course description */}
                <p className="card-text">{course.description}</p>
                {/* Course price */}
                {course.price === "Coming Soon" ? (
                    <h4 style={{color: "#FFA500"}}><strong>Coming Soon</strong></h4>
                ) : (
                    <>
                        <p className="card-text" style={{color:'#FF6F61'}}>
                            <strong>
                                Introductory Price: ₹ {course.price}/- 
                            </strong>
                        </p>
                        <p className="card-text" style={{ textDecoration: "line-through", color: "#333" }}>
                            Original Price: ₹ {course.original_price}/-
                        </p>
                        {/* Link to view more details about the course */}
                        <div className="go-to-course">
                            <Link to={`/courses/${course.short_title}`}>View Course</Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    </div>
    );
}

export default CourseCard;
