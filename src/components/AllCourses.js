import React, {useState, useEffect} from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AllCourses.css';

const AllCourses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch data from the API using Axios
        axios.get('https://dev.vibegurukul.in/api/v1/courses') 
          .then(response => setCourses(response.data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

    return (
        <div className="all-courses">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <a href="/home" className="back-link">&lt; Back</a>
                        <h1 className="text-center my-4">All Courses</h1>
                    </div>
                </div>
                <div className="row">
                    {courses.map(course =>(
                        <CourseCard key={course._id} course={course} />
                    ))}
                
                </div>
            </div>
        </div>
    );
};

export default AllCourses;