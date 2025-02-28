import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import VideoJS from './VideoJS';
import CourseReviewForm from './CourseReviewForm';
import CourseReviewsList from './CourseReviewsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';
import UserTestimonials from './UserTestimonials';

const CourseDetails = ({ course, id }) => {
    // State to manage enrollment status messages
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    // State to track if the user is enrolled in the course
    const [isEnrolled, setIsEnrolled] = useState(false);
    // State to store the progress data for each section of the course
    const [progressData, setProgressData] = useState({});
    // State to track if the course is added to the cart
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    // State to track the payment status for the course
    const [paymentStatus, setPaymentStatus] = useState(false);

    // Extract the `shortTitle` parameter from the URL
    const { shortTitle } = useParams();

    // Retrieve the user's access token and email from localStorage
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Function to check if the user is enrolled in the course
    const checkEnrollmentStatus = async () => {
        if (!token) {
            return; // Exit if the user is not logged in
        }
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/check-enroll`, {
                params: { user_email: email, course_id: id },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.isEnrolled) {
                setIsEnrolled(true); // Update state if the user is enrolled
            }
        } catch (error) {
            console.error('Error checking enrollment status:', error);
        }
    };

    // Function to check the payment status for the course
    const checkPaymentStatus = async () => {
        if (!token) {
            return; // Exit if the user is not logged in
        }
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/payments/check-payment-status`, {
                params: { course_id: id },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setPaymentStatus(true); // Update state if payment is successful
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return; // Ignore if payment status is not found
            } else {
                console.log('An unexpected error occurred while fetching course payments.');
            }
        }
    };

    // Function to fetch the user's progress in the course
    const fetchCourseProgress = async () => {
        if (!isEnrolled) return; // Exit if the user is not enrolled
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/users/progress/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Format progress data into an object with section IDs as keys
            const progress = response.data.reduce((acc, item) => {
                acc[item.section_id] = item.progress;
                return acc;
            }, {});
            setProgressData(progress); // Update progress state
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Course progress not found. User may not have started the course.');
            } else {
                console.log('An unexpected error occurred while fetching course progress.');
            }
        }
    };

    // Fetch enrollment and payment status when the component mounts
    useEffect(() => {
        checkEnrollmentStatus();
        checkPaymentStatus();
    }, []);

    // Fetch course progress when the user is enrolled
    useEffect(() => {
        if (isEnrolled) {
            fetchCourseProgress();
        }
    }, [isEnrolled]);

    // Function to handle section clicks (e.g., viewing progress)
    const handleSectionClick = async (sectionId) => {
        if (isEnrolled) {
            await fetchCourseProgress(); // Refresh progress data
        } else {
            setEnrollmentStatus('Please enroll in the course to view progress.');
        }
    };

    // Function to add the course to the cart
    const handleAddToCart = async () => {
        const courseData = { course_id: id, price: course.price, title: course.title, preview_image: course.preview_image, short_title: course.short_title };
    
        if (!token) {
            // If the user is not logged in, save the course to localStorage
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            localCart.push(courseData);
            localStorage.setItem('cart', JSON.stringify(localCart));
            setIsAddedToCart(true);
            setEnrollmentStatus('Course added to cart!');
            return;
        }
    
        try {
            // If the user is logged in, add the course to the cart via API
            const response = await axios.post(
                'https://dev.vibegurukul.in/api/v1/users/cart/add',
                courseData,
                { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
            );
            if (response.status === 200) {
                setIsAddedToCart(true);
                setEnrollmentStatus('Course added to cart!');
            }
        } catch (error) {
            setEnrollmentStatus('Error adding course to cart. Please try again later.');
            console.error('Error adding course to cart:', error);
        }
    };
    
    // Function to navigate to the cart page
    const handlePayment = async () => {
        navigate('/cart');
    };
    
    // Function to handle course enrollment
    const handleEnroll = async () => {
        if (!token) {
            setEnrollmentStatus('Please log in to enroll in the course.');
            return;
        }

        try {
            const response = await axios.post(`https://dev.vibegurukul.in/api/v1/enroll`, {
                course_id: id,
                user_email: email
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                setEnrollmentStatus("You have successfully enrolled in the course!! You can now view the episodes!! Thanks");
                setIsEnrolled(true); // Update enrollment status
            }
        } catch (error) {
            setEnrollmentStatus("Sorry, there was an error enrolling in the course. Please try again later");
        }
    };

    // Prepare text content for display
    const text = [course.description, course.learnings, course.usp];
    const headings = ['Description:', 'Learnings:', 'USP:'];

    // Function to format text content with line breaks
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

    // Reference for the video player
    const playerRef = React.useRef(null);

    // Options for the video player
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        responsive: true,
        fluid: true,
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: course.videos[0].url,
            type: 'application/x-mpegURL'
        }]
    };

    // Function to handle video player readiness
    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

    // Function to handle section clicks (with enrollment check)
    const handleClick = (sectionId) => {
        if (isEnrolled) {
          handleSectionClick(sectionId);
        } else {
          alert("Please enroll first to see the episode!");
        }
      };

    return (
        <div className='course-details-container'>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <h1>{course.title}</h1>
                        {/* Video player component */}
                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                        <br />
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 sticky-card">
                            <div className="card-body">
                                {/* Display formatted course details */}
                                {formattedText(text)}
                                <h4>{enrollmentStatus && <p>{enrollmentStatus}</p>}</h4>
                                {!isEnrolled && (
                                    <div>
                                        <h5 style={{color: '#FFA500'}}><strong>Introductory Price: ₹{course.price}/-</strong></h5>
                                        <p>(Including GST)</p>
                                        <p className="card-text" style={{ textDecoration: "line-through", color: "#333" }}>
                                            Original Price: ₹ {course.original_price}/-
                                        </p>
                                        {!paymentStatus ? (
                                            <div>
                                                <h5 className="card-title">Try the course now...</h5>
                                                {!isAddedToCart ? (
                                                    <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                                        Enroll Now
                                                    </button>
                                                ) : (
                                                    <button className="btn-payment" onClick={handlePayment}>
                                                        Proceed to Payment
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <button className="btn btn-primary" onClick={handleEnroll}>
                                                WATCH Now
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="episode-list">
                    <h3 className="font-weight-bold mb-3" style={{ textAlign: 'center' }}>Episodes</h3>
                        <ul className="list-group list-group-light">
                            {/* Display list of course sections */}
                            {course.sections.map((section, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    {isEnrolled ? (
                                        <Link to={`/courses/${shortTitle}/section/${section.id}`} className='fw-bold' style={{color:'#FFF'}} onClick={() => handleSectionClick(section.id)}>
                                            {section.heading}
                                        </Link>
                                    ) : (
                                        <span className='fw-bold'>{section.heading}</span>
                                    )}
                                    {isEnrolled && <p>Progress: {progressData[section.id] || 0}%</p>}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                {/* Display user testimonials */}
                <UserTestimonials />
                {!isEnrolled && (
                    <div>
                        {!paymentStatus ? (
                            <div className='text-center'>
                                <h5 className="fw-bold">Try the course now...</h5>
                                {!isAddedToCart ? (
                                    <div className="d-grid gap-2 col-4 mx-auto">
                                        <button className="btn btn-danger btn-lg" onClick={handleAddToCart}>
                                            Enroll Now
                                        </button>
                                    </div>
                                ) : (
                                    <div className="d-grid gap-2 col-4 mx-auto">
                                        <button className="btn btn-warning btn-lg" onClick={handlePayment}>
                                            Proceed to Payment
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="d-grid gap-2 col-4 mx-auto">
                                <button className="btn btn-primary" onClick={handleEnroll}>
                                    WATCH Now
                                </button>
                            </div>
                        )}
                    </div>
                                )}
                <div className="row mt-4">
                    <div className="col-16">
                        {/* Display course review form and reviews list */}
                        {isEnrolled && (
                            <CourseReviewForm courseId={id} token={token} onReviewSubmitted={fetchCourseProgress} />
                        )}
                        <CourseReviewsList courseId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default CourseDetails;