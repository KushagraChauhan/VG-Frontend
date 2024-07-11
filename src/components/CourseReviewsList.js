// ReviewsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/CourseReviewList.css';

const ReviewsList = ({ courseId }) => {
    const [reviews, setReviews] = useState([]);
    const [fetchError, setFetchError] = useState('');

    const fetchReviews = async () => {
        try {
            const response = await axios.get(`https://dev.vibegurukul.in/api/v1/courses/${courseId}/reviews`);
            setReviews(response.data);
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
        <div className="reviews-list">
            <div className="reviews-list">
            <h3>Course Reviews</h3>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="review">
                        <div className="star-rating">
                            {renderStars(review.rating)}
                        </div>
                        <h6>{review.comment}</h6>
                        <small>By: {review.full_name}</small>
                    </div>
                ))
            ) : (
                <p>No reviews yet. Be the first to review this course!</p>
            )}
        </div>
    </div>
    );
};

export default ReviewsList;
