import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard"; // Importing the CourseCard component for individual course display
import axios from "axios"; // Importing axios for making HTTP requests
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling
import './css/AllCourses.css'; // Importing custom CSS for additional styling
import LoadingSpinner from "./Loading"; // Importing a loading spinner component to show during data fetch

const AllCourses = () => {
    // State to store the list of courses fetched from the API
    const [courses, setCourses] = useState([]); 
    
    // State to manage the loading state of the component
    const [isLoading, setIsLoading] = useState(true);

    // useEffect hook to fetch data when the component mounts
    useEffect(() => {
        // Making a GET request to fetch courses data
        axios.get('https://dev.vibegurukul.in/api/v1/courses')
            .then(response => {
                // If the request is successful, update the courses state with the data
                setCourses(response.data);
                // Set loading state to false as data has been successfully fetched
                setIsLoading(false);
            })
            .catch(error => {
                // Log any errors that occur during the request
                console.error('Error fetching data:', error);
                // Keep loading state as true if there's an error
                setIsLoading(true); 
            });
    }, []); // Empty dependency array ensures this effect runs only once after the component mounts

    // If data is still loading, display a loading spinner
    if (isLoading) return <LoadingSpinner />;

    // Render the list of courses after data is fetched
    return (
        <div className="all-courses">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Link to go back to the home page */}
                        <a href="/home" className="back-link">&lt; Back</a>      
                        <h1 className="text-center my-4" style={{color: "#FF6F61"}}>All Courses</h1>
                        {/* Description of the courses offered */}
                        <h6 className="text-center my-4">
                            All these courses cover facts with all the proofs. Ancient wisdom is brought from the knowledge of our Shastras, 
                            which includes proper Mantras, Shlokas, and story references. Bhartiya Itihas only shows the truth with references 
                            from Arab historians, Western historians, Eastern historians, and some Indians. We want the Indians to feel proud in Bharat. 
                            Vibe Gurukul welcomes all seekers of knowledge and we promise to enhance your thinking from the day you take our courses.
                        </h6>
                    </div>
                </div>
                <div className="row">
                    {/* Map through the courses array and render a CourseCard for each course */}
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllCourses;
