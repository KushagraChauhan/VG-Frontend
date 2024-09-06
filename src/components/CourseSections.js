import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoJS from './VideoJS';
import './css/CourseSections.css';
import LoadingSpinner from './Loading';

const CourseSections = () => {
  const { id, sectionId } = useParams();
  const [course, setCourse] = useState(null);
  const [videoJsOptions, setVideoJsOptions] = useState(null);
  const [timestamps, setTimestamps] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const playerRef = React.useRef(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${id}`);
        setCourse(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    if (course) {
      const section = course.sections.find(section => section.id === sectionId);
      if (section) {
        // Set video.js options
        setVideoJsOptions({
          autoplay: false,
          controls: true,
          responsive: true,
          fluid: true,
          playbackRates: [0.5, 1, 1.5, 2],
          sources: [{
            src: section.videos[0].url,
            type: 'application/x-mpegURL'
          }]
        });

        // Extract timestamps from section.description (assuming it's in the format of "00:10 Title")
        const descriptionLines = section.description.split('\n');
        const parsedTimestamps = descriptionLines.map(line => {
          const parts = line.split(' '); // Split by space, assuming format: "00:10 Title"
          const timeParts = parts[0].split(':'); // Split the time part (00:10)
          const timeInSeconds = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10);
          const label = parts.slice(1).join(' '); // Rest of the line is the label
          return {
            time: timeInSeconds,
            label: label
          };
        });

        setTimestamps(parsedTimestamps); // Set the timestamps
      }
    }
  }, [course, sectionId]);

  const token = localStorage.getItem('access_token');
  const email = localStorage.getItem('email');

  if (!token) {
    return <div className='course-section-container'>Please login first</div>;
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const section = course.sections.find(section => section.id === sectionId);

  if (!section) {
    return <div className='course-section-container'>Section not found</div>;
  }

  const updateSectionProgress = async (progress) => {
    try {
      await axios.put(`https://dev.vibegurukul.in/api/v1/users/progress/${id}/${sectionId}`, {
        progress: progress,
        token: token
      });
    } catch (error) {
      console.error('Error Updating Section Progress: ', error);
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
  const text = [section.description];
  const formattedText = (textArray) => {      
    return textArray.map((content) => (
      <div>
        <p>
          {/* Split content by newline and render each line separately */}
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

  return (
    <div className='course-section-container'>
      <div className="container mt-4">
        <h1 className='course-section-heading'>{section.heading}</h1>
        <h4>Episode Description</h4>
        <p>{section.usp}</p>
        <div className="section-video-container">
          {videoJsOptions && (
            <VideoJS
              options={videoJsOptions}
              timestamps={timestamps} // Pass the parsed timestamps to VideoJS component
              onReady={handlePlayerReady}
              class="video-js vjs-theme-city"
            />
          )}
        </div>
        <div className="section-details">
          <h4>Section Details</h4>
          <p>{formattedText(text)}</p>
        </div>
        <div className="back-to-course">
          <a href={`/courses/${id}`}>Back to Course Details</a>
        </div>
      </div>
    </div>
  );
};

export default CourseSections;
