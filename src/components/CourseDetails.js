import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";
import VideoJS from './VideoJS';
import CourseReviewForm from './CourseReviewForm';
import CourseReviewsList from './CourseReviewsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/CourseDetails.css';

const CourseDetails = ({ course }) => {
    const [enrollmentStatus, setEnrollmentStatus] = useState('');
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [progressData, setProgressData] = useState({});
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(false);
    
    const { id } = useParams();
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
            console.error('Error checking payment status:', error);
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
        if (!token) {
            setEnrollmentStatus('Please log in to add the course to your cart.');
            return;
        }

        try {
            const response = await axios.post(
                'https://dev.vibegurukul.in/api/v1/users/cart/add',
                { course_id: id, price: course.price, course_title: course.title, preview_image: course.preview_image },
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
        if (!token) {
            setPaymentStatus("Please complete the payment first..");
            return;
        }
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
                setEnrollmentStatus("You have successfully enrolled in the course!! You can now view the sections!! Thanks");
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
            src: 'https://vibegurukul.s3.ap-south-1.amazonaws.com/Edited+videos+HLS/output.m3u8',
            type: 'application/x-mpegURL'
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
    
    return (
        <div className='course-details-container'>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="display-4">{course.title}</h1>
                        {/* <img src={course.preview_image} className="img-fluid rounded mb-4" alt={course.title} /> */}
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
                                        {!paymentStatus ? (
                                            <div>
                                                <h5 className="card-title">Try the course now...</h5>
                                                {!isAddedToCart ? (
                                                    <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <button className="btn-payment" onClick={handlePayment}>
                                                        Proceed to Payment
                                                    </button>
                                                )}
                                            </div>
                                        ) : (
                                            <button className="btn-enroll" onClick={handleEnroll}>
                                                Enroll Now
                                            </button>
                                        )}
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
                                        <Link to={`/courses/${id}/section/${section.id}`} className='fw-bold' onClick={() => handleSectionClick(section.id)}>{section.heading}</Link>
                                    ) : (
                                        <span className='fw-bold'>{section.heading}</span>
                                    )}
                                    {isEnrolled && (
                                        <p>Progress: {progressData[section.id] || 0}%</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-12">
                        {isEnrolled && <CourseReviewForm courseId={id} token={token} onReviewSubmitted={fetchCourseProgress} />}
                        <CourseReviewsList courseId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;
