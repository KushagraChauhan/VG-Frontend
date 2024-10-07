import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/CourseReviewList.css';

const ReviewsList = ({ courseId }) => {
    const [reviews, setReviews] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [averageRating, setAverageRating] = useState(0);
    const [ratingCounts, setRatingCounts] = useState({});

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${courseId}/reviews`);
            setReviews(response.data.reviews || []);
            setAverageRating(response.data.average_rating || 0);
            setRatingCounts(response.data.rating_counts || {});
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setFetchError('Failed to fetch reviews. Please try again.');
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [courseId]);

    const renderStars = (rating) => {
        return [...Array(5)].map((star, index) => (
            <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>&#9733;</span>
        ));
    };

    return (
        <div className="reviews-list container">
            <h3 className="font-weight-bold mb-3" style={{ textAlign: 'center' }}>Course Ratings</h3>
            {fetchError && <p className="error">{fetchError}</p>}
            {/* <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Average Rating: {averageRating.toFixed(1)}</h5>
                    <div className="star-rating mb-3">
                        {renderStars(Math.round(averageRating))}
                    </div>
                    <div className="rating-counts">
                        {Object.keys(ratingCounts).map((rating) => (
                            <div key={rating}>
                                {rating} stars: {ratingCounts}
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            <div className="col-xl-12 col-lg-6">
                <div className="card l-bg-orange-dark">
                    <div className="card-rating-3 p-4">
                        <div className="mb-4">
                            <h5 className="card-title mb-0">Average Rating: {averageRating.toFixed(2)}</h5>
                        </div>
                        <div className="row align-items-center mb-2 d-flex">
                            <div className="col-8">
                                <div className="star-rating-average mb-3">
                                    {renderStars(Math.round(averageRating))}
                                </div>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>

            {/* Course Review Form */}
            {/* {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div className="col-xl-12 col-lg-6">
                        <div key={index} className="card mb-3">
                            <div className="card-body">
                            <div className="row align-items-center mb-2 d-flex">
                                <div className="text-center mb-2">
                                    {renderStars(review.rating)}
                                </div>                               
                                <h6 className="card-text">{review.comment}</h6>
                                <small className="m-b-0">By: {review.full_name}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No reviews yet. Be the first to review this course!</p>
            )} */}
        </div>
    );
};

export default ReviewsList;
