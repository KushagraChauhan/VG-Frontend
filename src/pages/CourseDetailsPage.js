import React, {useState, useEffect} from "react";
import { useParams} from 'react-router-dom';
import axios from "axios";
import CourseDetails from "../components/CourseDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import Header from '../components/Header';
import LPHeader from '../components/LPHeader';

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
    const {id} = useParams();
    const [course, setCourse] = useState(null);
    const isAuthenticated = useAuth();

    useEffect(() =>{
        axios.get(`http://3.106.139.89/api/v1/courses/${id}`)
            .then(response => {
                setCourse(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!!", error);
            });
    }, [id]);

    if (!course) return <p>Loading...</p>;

    return(
        <div>
            {isAuthenticated ? <Header /> : <LPHeader />}
            <CourseDetails course={course} />
            <Footer />
        </div>
    );
}

export default CourseDetailsPage;