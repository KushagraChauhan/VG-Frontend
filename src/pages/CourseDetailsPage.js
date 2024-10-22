import React, {useState, useEffect} from "react";
import { useParams} from 'react-router-dom';
import axios from "axios";
import CourseDetails from "../components/CourseDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';
import LoadingSpinner from "../components/Loading";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    useEffect(() => {
      const token = localStorage.getItem('access_token');
      const email = localStorage.getItem('email');
      if (token && email) {
        setIsAuthenticated(true);
      }
    }, []);
  
    return isAuthenticated;
  };
  

const CourseDetailsPage = () => {
    const { shortTitle } = useParams();
    const [course, setCourse] = useState(null);
    const [id, setId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isAuthenticated = useAuth();

    useEffect(() => {
        const fetchCourseByShortTitle = async () => {
            try {
                //Resolve the shortTitle to courseId
                const response = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${shortTitle}/resolve`);
                const courseId = response.data.id;
                setId(response.data.id);
                // Fetch course details by the resolved courseId
                const courseResponse = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${courseId}`);
                setCourse(courseResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error("There was an error fetching the data!!", error);
                setIsLoading(true);
            }
        };

        fetchCourseByShortTitle();
    }, [shortTitle]);

    if (isLoading) return <LoadingSpinner />;

    return(
        <div>
            {isAuthenticated ? <Header /> : <LPHeader />}
            <CourseDetails course={course} id={id} />
            <Footer />
        </div>
    );
}

export default CourseDetailsPage;