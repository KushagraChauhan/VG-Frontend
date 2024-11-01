import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, Link, useNavigate } from "react-router-dom";
import VideoJS from './VideoJS';
import CourseReviewForm from './CourseReviewForm';
import CourseReviewsList from './CourseReviewsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';
import UserTestimonials from './UserTestimonials';

const CourseDetails = ({ course, id }) => {
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [progressData, setProgressData] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false);

    const { shortTitle } = useParams();

    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const checkEnrollmentStatus = async () => {
        if (!token) {
            return;
        }
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/check-enroll`, {
                params: { user_email: email, course_id: id },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.isEnrolled) {
                setIsEnrolled(true);
            }
        } catch (error) {
            console.error('Error checking enrollment status:', error);
        }
    };

    const checkPaymentStatus = async () => {
        if (!token) {
            return;
        }
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/payments/check-payment-status`, {
                params: { course_id: id },
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.status === 200) {
                setPaymentStatus(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                return;
            } else {
                console.log('An unexpected error occurred while fetching course payments.');
            }
        }
    };

    const fetchCourseProgress = async () => {
        if (!isEnrolled) return;
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/users/progress/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const progress = response.data.reduce((acc, item) => {
                acc[item.section_id] = item.progress;
                return acc;
            }, {});
            setProgressData(progress);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log('Course progress not found. User may not have started the course.');
            } else {
                console.log('An unexpected error occurred while fetching course progress.');
            }
        }
    };

    useEffect(() => {
        checkEnrollmentStatus();
        checkPaymentStatus();
    }, []);

    useEffect(() => {
        if (isEnrolled) {
            fetchCourseProgress();
        }
    }, [isEnrolled]);

    const handleSectionClick = async (sectionId) => {
        if (isEnrolled) {
            await fetchCourseProgress();
        } else {
            setEnrollmentStatus('Please enroll in the course to view progress.');
        }
    };

    const handleAddToCart = async () => {
        const courseData = { course_id: id, price: course.price, course_title: course.title, preview_image: course.preview_image, short_title: course.short_title };
    
        if (!token) {
            const localCart = JSON.parse(localStorage.getItem('cart')) || [];
            localCart.push(courseData);
            localStorage.setItem('cart', JSON.stringify(localCart));
            setIsAddedToCart(true);
            setEnrollmentStatus('Course added to cart!');
            return;
        }
    
        try {
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
    
    const handlePayment = async () => {
        navigate('/cart');
    };
    

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
                setIsEnrolled(true);
            }
        } catch (error) {
            setEnrollmentStatus("Sorry, there was an error enrolling in the course. Please try again later");
        }
    };

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
        playbackRates: [0.5, 1, 1.5, 2],
        sources: [{
            src: course.videos[0].url,
            type: 'application/x-mpegURL'
        }]
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on('waiting', () => {
            console.log('player is waiting');
        });

        player.on('dispose', () => {
            console.log('player will dispose');
        });
    };

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
                        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                        <br />
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-4 sticky-card">
                            <div className="card-body">
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
