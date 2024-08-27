import React, {useState, useEffect} from "react";
import CourseCard from "./CourseCard";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/AllCourses.css';
import LoadingSpinner from "./Loading";

const AllCourses = () => {
    const [courses, setCourses] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://dev.vibegurukul.in/api/v1/courses')
            .then(response => {
                setCourses(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsLoading(true); 
            });
    }, []);
    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="all-courses">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <a href="/home" className="back-link">&lt; Back</a>      
                        <h1 className="text-center my-4" style={{color: "#FF6F61"}}>All Courses</h1>
                        <h6 className="text-center my-4">All these courses cover facts with all the proofs. Ancient wisdom is brought from the knowledge of our Shastras, which includes proper Mantras, Shlokas, and story references. Bhartiya Itihas only shows the truth with references from Arab historians, Western historians, Eastern historians, and some Indians.
                            We want the Indians to feel proud in Bharat. Vibe Gurukul welcomes all seekers of knowledge and we promise to enhance your thinking from the day you take our courses.
                        </h6>
                        
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