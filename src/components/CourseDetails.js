import React, {useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';

const CourseDetails = ( {course} ) => {
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    const handleEnroll = async () => {
        if (!token) {
            setEnrollmentStatus('Please log in to enroll in the course.');
            return;
        }

        try{
            const response = await axios.post(`http://127.0.0.1:8000/api/v1/enroll`, {
                course_id: course._id,
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
            // else if (response.status == 401){
            //     setEnrollmentStatus("Please Login First!! Thanks");
            // }
        }
        catch(error){
            setEnrollmentStatus("Sorry, there was an error enrolling in the course. Please try again later")
            console.error("Error:", error)
        }
    }

    return(
      <div className='course-details-container'>
      <div className="container mt-4">
      <div className="row">
          <div className="col-md-8">
              <h1 className="display-4">{course.title}</h1>
              <img src={course.preview_image} className="img-fluid rounded mb-4" alt={course.title} />
              <div className="mb-4">
                  <p><strong>Description:</strong> {course.description}</p>
                  <p><strong>Learnings:</strong> {course.learnings}</p>
                  <p><strong>USP:</strong> {course.usp}</p>
              </div>
          </div>
          <div className="col-md-4">
              <div className="card mb-4">
                  <div className="card-body">
                      
                      {enrollmentStatus && <p>{enrollmentStatus}</p>}
                        {!isEnrolled && (
                            <div>
                            <h5 className="card-title">Try the course now...</h5>
                            <button className="btn btn-primary" onClick={handleEnroll}>
                                Enroll Now
                            </button>
                            </div>
                        )}
                      {/* <button onClick={handleEnroll} className="btn btn-primary btn-block">Enroll Now</button>
                        {enrollmentStatus && <p className="mt-2">{enrollmentStatus}</p>} */}
                  </div>
              </div>
          </div>
      </div>
      <div className="row">
          <div className="col-12">
              <h2>Sections</h2>
              <ul className="list-group">
                  {course.sections.map((section, index) => (
                      <li key={index} className="list-group-item">
                          <h5>{section.heading}</h5>
                          <p className="text-muted">Duration: {section.duration} minutes</p>
                          <ul className="list-unstyled">
                              {section.videos.map((video, vIndex) => (
                                  <li key={vIndex}>{video.title} - {video.duration} minutes</li>
                              ))}
                          </ul>
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