import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import '../css/CourseSectionPage.css';

const CourseSectionPage = () => {
    const { id, sectionId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourse();
    }, [id]);

    if (!course) {
        return <div>Loading...</div>;
    }

    const section = course.sections.find(section => section.id === sectionId);

    if (!section) {
        return <div>Section not found</div>;
    }

    return (
        <div className='course-section-container'>
            <div className="container mt-4">
                <h1>{section.heading}</h1>
                <p>Duration: {section.duration} minutes</p>
                <ul className="list-group list-group-light">
                    {section.videos.map((video, index) => (
                        <li key={index} className="list-group-item">
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                                {video.title}
                            </a>
                            <span className="text-muted"> - {video.duration} minutes</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CourseSectionPage;
