import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, Link } from "react-router-dom";
import VideoJS from './VideoJS';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';

const CourseDetails = ( {course} ) => {
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [progressData, setProgressData] = useState({});
    const {id} = useParams();

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    const checkEnrollmentStatus = async () => {
        if(!token){
            return;
        }
        try {
            const response = await axios.get(`http://3.106.139.89/api/v1/check-enroll`, {
                params: { user_email: email , course_id: id},
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.isEnrolled) {
                setIsEnrolled(true);
            }
        } catch (error) {
            console.error('Error checking enrollment status:', error);
        }
    };

    const fetchCourseProgress = async () => {
        try {
            const response = await axios.get(`http://3.106.139.89/api/v1/users/progress/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const progress = response.data.reduce((acc, item) => {
                acc[item.section_id] = item.progress;
                return acc;
            }, {});
            setProgressData(progress);
        } catch (error) {
            console.error('Error fetching course progress:', error);
        }
    };

    useEffect(() => {
        checkEnrollmentStatus();
        fetchCourseProgress();
    }, [id]);

    const handleEnroll = async () => {
        if (!token) {
            setEnrollmentStatus('Please log in to enroll in the course.');
            return;
        }

        try{
            const response = await axios.post(`http://3.106.139.89/api/v1/enroll`, {
                course_id: id,
                user_email: email
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            if (response.status == 201){
                setEnrollmentStatus("You have successfully enrolled in the course!! Thanks");
                setIsEnrolled(true);
            }
            
        }
        catch(error){
            setEnrollmentStatus("Sorry, there was an error enrolling in the course. Please try again later")
        }
    }

    const text = [course.description, course.learnings, course.usp];
    const headings = ['Description:', 'Learnings:', 'USP:'];

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

    const playerRef = React.useRef(null);

    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
        src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
        type: 'video/mp4'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          console.log('player is waiting');
        });
    
        player.on('dispose', () => {
          console.log('player will dispose');
        });
      };
      
    return(
      <div className='course-details-container'>
      <div className="container mt-4">
      <div className="row">
          <div className="col-md-8">
              <h1 className="display-4">{course.title}</h1>
              {/* <img src={course.preview_image} className="img-fluid rounded mb-4" alt={course.title} />    */}
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> 
              <br></br>       
              <div className="mb-4">
                  {formattedText(text)}
              </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4 sticky-card">
                <div className="card-body">
                    {formattedText(text)}
                    <h4>{enrollmentStatus && <p>{enrollmentStatus}</p>}</h4>                   
                    {!isEnrolled && (
                        <div>                          
                            <h5 className="card-title">Try the course now...</h5>
                            <button className="btn-enroll" onClick={handleEnroll}>
                                Enroll Now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
      </div>
      <div className="row">
          <div className="col-12">
              <h2>Sections</h2>
              <ul className="list-group list-group-light">
                  {course.sections.map((section, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        {isEnrolled ? (
                          <Link to={`/courses/${id}/section/${section.id}`} className='fw-bold'>{section.heading}</Link>
                        ) : (
                            <span className='fw-bold'>{section.heading}</span>
                        )}
                          <p className="text-muted">Duration: {section.duration} minutes</p>
                          {isEnrolled && (
                                        <p>Progress: {progressData[section.id] || 0}%</p>
                                    )}
                      </li>
                  ))}
              </ul>
          </div>
      </div>
    </div>
  </div>
    );
}

export default CourseDetails;