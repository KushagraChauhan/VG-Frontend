import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import LoadingSpinner from './Loading';
import './css/UserProfile.css';

const UserCourses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/users/me/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [token]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="user-courses">
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet.</p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course._id} className="course-item">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <div className="go-to-course">
                      <Link to={`/courses/${course._id}`}>View Course</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCourses;
