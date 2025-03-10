import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import VideoJS from './VideoJS';
import './css/CourseSections.css';
import LoadingSpinner from './Loading';

const CourseSections = () => {
  // Extract `shortTitle` and `sectionId` from the URL parameters
  const { shortTitle, sectionId } = useParams();
  // State to store the course ID
  const [id, setId] = useState(null);
  // State to store the course details
  const [course, setCourse] = useState(null);
  // State to store video.js options for the video player
  const [videoJsOptions, setVideoJsOptions] = useState(null);
  // State to store timestamps parsed from the section description
  const [timestamps, setTimestamps] = useState([]);
  // State to manage the loading state of the component
  const [isLoading, setIsLoading] = useState(true);
  // Reference to the video player instance
  const playerRef = React.useRef(null);

  // Fetch course details when the component mounts or `shortTitle` changes
  useEffect(() => {
    const fetchCourseByShortTitle = async () => {
      try {
        // Resolve the `shortTitle` to a course ID
        const response = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${shortTitle}/resolve`);
        const courseId = response.data.id;
        setId(response.data.id); // Set the course ID in state
        // Fetch the course details using the resolved course ID
        const courseResponse = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${courseId}`);
        setCourse(courseResponse.data); // Set the course details in state
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("There was an error fetching the data!!", error);
        setIsLoading(true); // Set loading to true if there's an error
      }
    };

    fetchCourseByShortTitle();
  }, [shortTitle]);

  // Set video.js options and parse timestamps when the course or sectionId changes
  useEffect(() => {
    if (course) {
      // Find the section in the course that matches the `sectionId`
      const section = course.sections.find(section => section.id === sectionId);
      if (section) {
        // Set video.js options for the video player
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

        // Parse timestamps from the section description
        const descriptionLines = section.description.split('\n');
        const parsedTimestamps = descriptionLines.map(line => {
          const parts = line.split(' '); // Split the line by spaces
          const timeParts = parts[0].split(':'); // Split the time part (e.g., "00:10")
          const timeInSeconds = parseInt(timeParts[0], 10) * 60 + parseInt(timeParts[1], 10); // Convert to seconds
          const label = parts.slice(1).join(' '); // Combine the remaining parts as the label
          return {
            time: timeInSeconds,
            label: label
          };
        });

        setTimestamps(parsedTimestamps); // Set the parsed timestamps in state
      }
    }
  }, [course, sectionId]);

  // Retrieve the user's access token and email from localStorage
  const token = localStorage.getItem('access_token');
  const email = localStorage.getItem('email');

  // If the user is not logged in, display a message
  if (!token) {
    return <div className='course-section-container'>Please login first</div>;
  }

  // Display a loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Find the section in the course that matches the `sectionId`
  const section = course.sections.find(section => section.id === sectionId);

  // If the section is not found, display a message
  if (!section) {
    return <div className='course-section-container'>Section not found</div>;
  }

  // Function to update the user's progress in the section
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

  // Function to handle video player readiness
  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Update progress when the video is paused
    player.on('pause', () => {
      const currentTime = player.currentTime();
      const duration = player.duration();
      const progress = (currentTime / duration) * 100; // Calculate progress percentage
      updateSectionProgress(progress); // Update progress in the backend
    });

    // Update progress to 100% when the video ends
    player.on('ended', () => {
      updateSectionProgress(100);
    });
  };

  // Function to format the section description with line breaks
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
        {/* Display the section heading */}
        <h1 className='course-section-heading'>{section.heading}</h1>
        {/* Display the episode description */}
        <h4>Episode Description</h4>
        <p>{section.usp}</p>
        <div className="section-video-container">
          {/* Render the video player if options are available */}
          {videoJsOptions && (
            <VideoJS
              options={videoJsOptions}
              timestamps={timestamps} // Pass the parsed timestamps to the VideoJS component
              onReady={handlePlayerReady}
              class="video-js vjs-theme-city"
            />
          )}
        </div>
        <div className="section-details">
          {/* Display section details */}
          <h4>Section Details</h4>
          <div>{formattedText(text)}</div>
        </div>
        {/* Link to go back to the course details page */}
        <div className="back-to-course">
          <a href={`/courses/${shortTitle}`}>Back to Course Details</a>
        </div>
      </div>
    </div>
  );
};

export default CourseSections;