import React ,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoJS from './VideoJS';
import './css/CourseSections.css';

const CourseSections = () => {
    const { id, sectionId } = useParams();
    const [course, setCourse] = useState(null);
    const [videoJsOptions, setVideoJsOptions] = useState(null);
    const playerRef = React.useRef(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course data:', error);
            }
        };

        fetchCourse();
    }, [id]);

    useEffect(() => {
        if (course) {
            const section = course.sections.find(section => section.id === sectionId);
            if (section) {
                setVideoJsOptions({
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [{
                        src: section.videos[0].url,
                        type: 'video/mp4'
                    }]
                });
            }
        }
    }, [course, sectionId]);
   
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');

    if(!token){
        return <div className='course-section-container'>Please login first</div>
    }
    if (!course) {
        return <div className='course-section-container'>Loading...</div>;
    }

    const section = course.sections.find(section => section.id === sectionId);

    if (!section) {
        return <div className='course-section-container'>Section not found</div>;
    }

    const updateSectionProgress = async (progress) => {
        try{
            await axios.put(`https://dev.vibegurukul.in/api/v1/users/progress/${id}/${sectionId}`,{
                progress: progress,
                token: token
            });
        }catch(error){
            console.error('Error Updating Section Progress: ', error)
        }
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        player.on('pause', () => {
            const currentTime = player.currentTime();
            const duration = player.duration();
            const progress = (currentTime / duration) * 100;
            updateSectionProgress(progress);
        });
    
        player.on('ended', () => {
            updateSectionProgress(100);
        });
      };

    return (
        <div className='course-section-container'>
        <div className="container mt-4">
            <h1 className='ourse-section-heading'>{section.heading}</h1>
            <p>Duration: {section.duration} minutes</p>
            <div className="section-video-container">
                {videoJsOptions && <VideoJS options={videoJsOptions} onReady={handlePlayerReady} /> }
            </div>
            <div className="section-details">
                <h4>Section Details</h4>
                <p>{section.description}</p>
            </div>
            <div className="back-to-course">
                <a href={`/courses/${id}`}>Back to Course Details</a>
            </div>
        </div>
    </div>
    );
}

export default CourseSections;